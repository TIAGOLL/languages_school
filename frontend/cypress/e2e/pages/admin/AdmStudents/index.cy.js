import { DataTableStudentsPage } from "../../../models/AdmStudents";
import { verifyUrlParams } from "./../../../utils";
import { SignInPage } from "./../../../models/SignIn";
import mask from "make-mask";
import { format } from "date-fns";

const dataTableStudents = new DataTableStudentsPage();
const signInPage = new SignInPage();

function uiCheck() {
	describe("should show corrects elements in page", () => {
		it("shold show name's students", () => {
			cy.get('[data-test="studentsName"]').each(($el) => {
				cy.wrap($el).should("not.be.empty");
			});
		});
		it("shold show email's students", () => {
			cy.get('[data-test="studentsEmail"]').each(($el) => {
				cy.wrap($el).should("contain.text", "@");
			});
		});
		it("should show cpf's students and whether they are in the correct format", () => {
			cy.get('[data-test="studentsCpf"]')
				.invoke("text")
				.then((cpfText) => {
					const cpfString = cpfText.trim();

					const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;

					const cpfs = cpfString.match(cpfRegex);

					expect(cpfs).to.not.be.null;

					cpfs.forEach((cpf) => {
						expect(cpf).to.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
					});
				});
		});
		it("shold show monthly's students", () => {
			cy.get('[data-test="studentsMonthly"]').each(($el) => {
				cy.wrap($el).should("contain.text", "R$");
			});
		});
		it("should display the table with correct headers", () => {
			cy.get('[data-test="studentsDataTable"]').should("be.visible");
			cy.get("th").eq(0).should("not.be.null");
			cy.get("th").eq(1).should("not.be.null");
			cy.get("th").eq(2).should("not.be.null");
			cy.get("th").eq(3).should("not.be.null");
			cy.get("th").eq(4).should("not.be.null");
			cy.get("th").eq(5).should("not.be.null");
			cy.get("th").eq(6).should("not.be.null");
		});
	});
}

describe("AdmStudents", () => {
	before(() => {
		signInPage.authAndSkipTests();
	});
	describe("when the user tries to search for a student using the name field", () => {
		const searchTerm = "student";
		it("visit the page", () => {
			dataTableStudents.visit();
		});
		it(`when i search ${searchTerm}`, () => {
			dataTableStudents.search({ name: searchTerm });
		});
		it(`should contain ${searchTerm} in name query param in URL`, () => {
			cy.url().should("contain", `name=${searchTerm}`);
		});
		it(`should show the ${searchTerm} name in table list`, () => {
			cy.get("[data-test=studentsDataTable] tbody tr [data-test=studentsName]").should("contain.text", `${searchTerm}`);
		});
		it(`should not show names other than ${searchTerm} in table list`, () => {
			cy.get('[data-test="studentsName"]').should(($names) => {
				const names = Array.from($names, (el) => el.innerText.toLowerCase());
				names.forEach((name) => {
					expect(name).to.include(searchTerm.toLowerCase());
				});
			});
		});
		uiCheck();
	});

	describe("when the user tries to search for a student using the email field", () => {
		const searchTerm = "student@school.com";

		it("visit the page", () => {
			dataTableStudents.visit();
		});
		it(`when i search ${searchTerm}`, () => {
			dataTableStudents.search({ email: searchTerm });
		});
		it(`should contain ${searchTerm} in email query param in URL`, () => {
			cy.url().should("contain", `email=${searchTerm.replace("@", "%40")}`);
		});
		it(`should show the ${searchTerm} email in table list`, () => {
			cy.get("[data-test=studentsDataTable] tbody tr [data-test=studentsEmail]").should("contain.text", `${searchTerm}`);
		});
		it(`should not show emails other than ${searchTerm} in table list`, () => {
			cy.get("[data-test=studentsEmail]").should(($emails) => {
				const emails = Array.from($emails, (el) => el.innerText.toLowerCase());
				emails.forEach((email) => {
					expect(email).to.include(searchTerm.toLowerCase());
				});
			});
		});
		uiCheck();
	});

	describe("when the user tries to search for a student using the course field", () => {
		const searchTerm = "Inglês";

		it("visit the page", () => {
			dataTableStudents.visit();
		});
		it(`when i search ${searchTerm}`, () => {
			dataTableStudents.search({ course: searchTerm });
		});
		it(`should contain ${searchTerm} in course query param in URL`, () => {
			cy.url().should("contain", `course=${searchTerm.replace("ê", "%C3%AA")}`);
		});
		it(`should show the ${searchTerm} course in table list`, () => {
			cy.get("[data-test=studentsCourses]").should("contain.text", `${searchTerm}`);
		});
		it(`should not show courses other than ${searchTerm} in table list`, () => {
			cy.get('[data-test="studentsCourses"]').should(($courses) => {
				const courses = Array.from($courses, (el) => el.innerText.toLowerCase());
				courses.forEach((course) => {
					expect(course).to.include(searchTerm.toLowerCase());
				});
			});
		});
		uiCheck();
	});
	describe("when the user tries to search for a student, but after he is clear the search filters", () => {
		const searchsTerms = {
			name: "student",
			email: "student@school.com",
			course: "Inglês",
		};

		it("visit the page", () => {
			dataTableStudents.visit();
		});
		it(`when i enter ${searchsTerms.name} in the name field `, () => {
			dataTableStudents.elements.nameSearchInput().type(searchsTerms.name);
		});
		it(`when i enter ${searchsTerms.email} in the email field`, () => {
			dataTableStudents.elements.emailSearchInput().type(searchsTerms.email);
		});
		it(`when i click in the course field`, () => {
			dataTableStudents.elements.courseSearchInput().click();
		});
		it(`when i select the ${searchsTerms.course}`, () => {
			cy.get('[role="option"]').contains(searchsTerms.course).click();
		});
		it("when i hit enter", () => {
			cy.get('[data-test="searchButton"]').click();
		});
		it(`should contain ${searchsTerms.course} in course query param in URL`, () => {
			cy.url().should("contain", `course=${searchsTerms.course.replace("ê", "%C3%AA")}`);
		});
		it(`should show the ${searchsTerms.course} course in table list`, () => {
			cy.get("[data-test=studentsCourses]").should("contain.text", `${searchsTerms.course}`);
		});
		it(`should not show courses other than ${searchsTerms.course} in table list`, () => {
			cy.get('[data-test="studentsCourses"]').should(($courses) => {
				const courses = Array.from($courses, (el) => el.innerText.toLowerCase());
				courses.forEach((course) => {
					expect(course).to.include(searchsTerms.course.toLowerCase());
				});
			});
		});
		it(`should contain ${searchsTerms.email} in email query param in URL`, () => {
			cy.url().should("contain", `email=${searchsTerms.email.replace("@", "%40")}`);
		});
		it(`should show the ${searchsTerms.email} email in table list`, () => {
			cy.get("[data-test=studentsDataTable] tbody tr [data-test=studentsEmail]").should("contain.text", `${searchsTerms.email}`);
		});
		it(`should not show emails other than ${searchsTerms.email} in table list`, () => {
			cy.get("[data-test=studentsEmail]").should(($emails) => {
				const emails = Array.from($emails, (el) => el.innerText.toLowerCase());
				emails.forEach((email) => {
					expect(email).to.include(searchsTerms.email.toLowerCase());
				});
			});
		});
		it(`should contain ${searchsTerms.name} in name query param in URL`, () => {
			cy.url().should("contain", `name=${searchsTerms.name}`);
		});
		it(`should show the ${searchsTerms.name} name in table list`, () => {
			cy.get("[data-test=studentsName]").should("contain.text", `${searchsTerms.name}`);
		});
		it(`should not show names other than ${searchsTerms.name} in table list`, () => {
			cy.get('[data-test="studentsName"]').should(($names) => {
				const names = Array.from($names, (el) => el.innerText.toLowerCase());
				names.forEach((name) => {
					expect(name).to.include(searchsTerms.name.toLowerCase());
				});
			});
		});
		it("when i click in clear filters", () => {
			dataTableStudents.elements.clearFilterButtton().click();
		});
		it("should not show the URL params", () => {
			cy.url().should("not.contain", "name");
			cy.url().should("not.contain", "email");
			cy.url().should("not.contain", "course");
		});
		uiCheck();
	});

	describe("when i click in edit student", () => {
		const searchTerm = "student@school.com";
		it("when i visit page", () => {
			dataTableStudents.visit();
		});
		it("when i search of student", () => {
			dataTableStudents.search({ email: searchTerm });
		});
		it("when i click in edit", () => {
			dataTableStudents.elements.studentsEditButton().click();
		});
		it("should redirect to student edit page", () => {
			cy.url().should("contain", "/admin/students");
			verifyUrlParams({ key: "tab", value: "update" });
		});
		it(`should contain ${searchTerm} in email query param in URL`, () => {
			verifyUrlParams({ key: "email", value: searchTerm });
		});
		it("should show data in all inputs", () => {
			cy.request("GET", `${Cypress.env("DEV_API")}/adm/studentbyemail/${searchTerm}`)
				.its("body")
				.then((res) => {
					const student = res;
					cy.get("[data-test=id]").should("have.value", student.id);
					cy.get("[data-test=firstName]").should("have.value", student.first_name);
					cy.get("[data-test=lastName]").should("have.value", student.last_name);
					cy.get("[data-test=cpf]").should("have.value", mask(student?.cpf || "", "000.000.000-00", { reverse: true }));
					cy.get("[data-test=phone]").should("have.value", student.phone);
					cy.get("[data-test=gender]").should("contain", student.gender == "M" ? "Masculino" : "Feminino");
					cy.get("[data-test=dateOfBirth]").should("contain", format(student.date_of_birth, "dd/MM/yyyy"));
					cy.get("[data-test=zipCode]").should("have.value", student.adresses.zip_code);
					cy.get("[data-test=street]").should("have.value", student.adresses.street);
					cy.get("[data-test=district]").should("have.value", student.adresses.district);
					cy.get("[data-test=number]").should("have.value", student.adresses.number);
					cy.get("[data-test=complement]").should("have.value", student.adresses.complement);
					cy.get("[data-test=state]").should("have.value", student.adresses.state);
					cy.get("[data-test=city]").should("have.value", student.adresses.city);
					cy.get("[data-test=email]").should("have.value", student.email);
					cy.get("[data-test=user]").should("have.value", student.user);
				});
		});
	});
});
