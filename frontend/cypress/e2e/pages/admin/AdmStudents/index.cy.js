import { DataTableStudentsPage } from "../../../models/DataTableStudents";
import { SignInPage } from "../../../models/SignIn";

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

describe("Data table", () => {
	before(() => {
		signInPage.authAndSkipTests();
	});
	describe("when the user tries to search for a student using the name field", () => {
		const searchTerm = "student";
		it("visit the page", () => {
			dataTableStudents.visit();
		});
		it(`when i enter ${searchTerm} in the name field `, () => {
			dataTableStudents.elements.nameSearchInput().type(`${searchTerm}`);
		});
		it("when i hit enter", () => {
			dataTableStudents.hitEnter();
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
		it(`when i enter ${searchTerm} in the email field`, () => {
			dataTableStudents.elements.emailSearchInput().type(searchTerm);
		});
		it("when i hit enter", () => {
			dataTableStudents.hitEnter();
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
		it(`when i click in the course field`, () => {
			dataTableStudents.elements.courseSearchInput().click();
		});
		it(`when i click in the ${searchTerm}`, () => {
			cy.get('[role="option"]').contains(searchTerm).click();
		});
		it("when i hit enter", () => {
			cy.get('[data-test="searchButton"]').click();
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
		uiCheck();
	});

	describe('', () => {
		
	});
});
