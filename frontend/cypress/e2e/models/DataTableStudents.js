export class DataTableStudentsPage {
	elements = {
		nameSearchInput: () => cy.get("[data-test=nameSearchInput]"),
		emailSearchInput: () => cy.get("[data-test=emailSearchInput]"),
		courseSearchInput: () => cy.get("[data-test=courseSearchInput]"),
		searchButton: () => cy.get("[data-test=searchButton]"),
		clearFilterButtton: () => cy.get("[data-test=clearFilterButtton]"),
	};

	hitEnter() {
		cy.focused().type("{enter}");
	}

	visit() {
		cy.visit("/admin/students");
	}
}
