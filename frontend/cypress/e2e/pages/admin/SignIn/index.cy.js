import { SignInPage } from "../../../models/SignIn";

const signInPage = new SignInPage();
describe("User login", () => {
	describe("when the user tries to login with blank form", () => {
		it("visit the page", () => {
			signInPage.visit();
		});
		it("when I hit enter", () => {
			signInPage.hitEnter();
		});
		it("should show user input error", () => {
			cy.get("[data-test=userErrorInput]").should("be.visible");
		});
		it("should show password input error", () => {
			cy.get("[data-test=passwordErrorInput]").should("be.visible");
		});
		it('should show pathname to equal a "/"', () => {
			cy.location("pathname").should("be.equal", "/");
		});
	});

	describe("when the user try to login with non-existing user", () => {
		it("visit the page", () => {
			signInPage.visit();
		});
		it("When I enter 'User not registered' in the user field", () => {
			signInPage.elements.loginUserInput().type("User not registered");
		});
		it("When I enter 'wrong password' in the password field", () => {
			signInPage.elements.loginPasswordInput().type("wrong password");
		});
		it("when I hit enter", () => {
			signInPage.hitEnter();
		});
		it("should show the toast is visible", () => {
			cy.get("[role=alert]").should("be.visible");
		});
		it("should show text error in toast", () => {
			cy.get("[role=alert]").should("be.visible").children().should("contain.text", "Usúario não encontrado!");
		});
		it("should show the corretly color in background of progress bar", () => {
			cy.get(".Toastify__progress-bar--error").should("have.css", "background-color", "rgb(231, 76, 60)");
		});
		it("should show pathname to equal a '/'", () => {
			cy.location("pathname").should("be.equal", "/");
		});
	});

	describe("when the user try to login with invalid credentials", () => {
		it("visit the page", () => {
			signInPage.visit();
		});
		it('When I enter "teste" in the user field', () => {
			signInPage.elements.loginUserInput().type("teste");
		});
		it('When I enter "wrong password" in the password field', () => {
			signInPage.elements.loginPasswordInput().type("wrong password");
		});
		it("when I hit enter", () => {
			signInPage.hitEnter();
		});
		it("should show the toast is visible", () => {
			cy.get("[role=alert]").should("be.visible");
		});
		it("should show text error in toast", () => {
			cy.get("[role=alert]").should("be.visible").children().should("contain.text", "Usúario ou senha inválidos!");
		});
		it("should show the corretly color in background of progress bar", () => {
			cy.get(".Toastify__progress-bar--error").should("have.css", "background-color", "rgb(231, 76, 60)");
		});
		it("should show pathname to equal a '/'", () => {
			cy.location("pathname").should("be.equal", "/");
		});
	});

	describe("when the user try to login with correct credentials", () => {
		it("visit the page", () => {
			signInPage.visit();
		});
		it('When I enter "teste" in the user field', () => {
			signInPage.elements.loginUserInput().type("teste");
		});
		it('When I enter "123098" in the password field', () => {
			signInPage.elements.loginPasswordInput().type("123098");
		});
		it("when I hit enter", () => {
			signInPage.hitEnter();
		});
		it('should show pathname to equal a "/admin/dashboard"', () => {
			cy.location("pathname").should("be.equal", "/admin/dashboard");
		});
		it("should show the toast is visible", () => {
			cy.get("[role=alert]").should("be.visible");
		});
		it("should show text error in toast", () => {
			cy.get("[role=alert]").should("be.visible").children().should("contain.text", "Bem vindo de volta!");
		});
		it("should show the corretly color in background of progress bar", () => {
			cy.get(".Toastify__progress-bar--success").should("have.css", "background-color", "rgb(7, 188, 12)");
		});
		it("should store user data in local storage", () => {
			expect(JSON.parse(localStorage.getItem("@ticketsPRO"))).to.be.property("name");
			expect(JSON.parse(localStorage.getItem("@ticketsPRO"))).to.be.property("email");
			expect(JSON.parse(localStorage.getItem("@ticketsPRO"))).to.be.property("admin");
			expect(JSON.parse(localStorage.getItem("@ticketsPRO"))).to.be.property("id");
		});
	});
});
