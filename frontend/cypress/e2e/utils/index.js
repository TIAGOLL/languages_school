export function verifyUrlParams({ key, value }) {
	cy.url().should("contain", `${key}=${value}`);
}
