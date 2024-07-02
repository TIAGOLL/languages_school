export class SignInPage {
	elements = {
		loginPasswordInput: () => cy.get("[data-test=loginPasswordInput]"),
		loginUserInput: () => cy.get("[data-test=loginUserInput]"),
		loginButtonSubmit: () => cy.get("[data-test=loginSubmitButton]"),
	};

	visit() {
		cy.visit("/");
	}

	hitEnter() {
		cy.focused().type("{enter}");
	}

	authAndSkipTests() {
		if (!JSON.parse(localStorage.getItem("@ticketsPRO"))?.name || !JSON.parse(localStorage.getItem("@ticketsPRO"))?.email || !JSON.parse(localStorage.getItem("@ticketsPRO"))?.admin || !JSON.parse(localStorage.getItem("@ticketsPRO"))?.id) {
			cy.getAllLocalStorage().then(() => {
				cy.visit("/", {
					onBeforeLoad(win) {
						win.localStorage.setItem("@ticketsPRO", JSON.stringify({ admin: true, avatarUrl: null, email: "teste@school.com", id: 1001, name: "Teste" }));
					},
				});
			});
		}
	}
}
