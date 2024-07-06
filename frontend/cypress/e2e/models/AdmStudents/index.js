export class DataTableStudentsPage {
	elements = {
		nameSearchInput: () => cy.get("[data-test=nameSearchInput]"),
		emailSearchInput: () => cy.get("[data-test=emailSearchInput]"),
		courseSearchInput: () => cy.get("[data-test=courseSearchInput]"),
		searchButton: () => cy.get("[data-test=searchButton]"),
		clearFilterButtton: () => cy.get("[data-test=clearFilterButton]"),
		studentsEditButton: () => cy.get(`[data-test=studentsEditButton]`),
	};

	search({ name = "", email = "", course = "" }) {
		if (name) {
			this.elements.nameSearchInput().type(name);
		}
		if (email) {
			this.elements.emailSearchInput().type(email);
		}
		if (course) {
			this.elements.courseSearchInput().click();
			cy.get('[role="option"]').contains(course).click();
		}
		this.elements.searchButton().click();
	}

	hitEnter() {
		cy.focused().type("{enter}");
	}

	visit() {
		cy.visit("/admin/students");
	}
}
