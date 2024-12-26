describe('Sign-Up Test Suite for Magento Website', () => {

  // Test Data
  const testData = {
    firstName: 'Pratik',
    lastName: 'Dutta',
    email: `pratik93${Date.now()}@example.com`, // Unique email
    password: 'Password123!',
  };

  beforeEach(() => {
    // Visit the account creation page before each test
    cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
  });

  it('Should successfully sign up with valid details', () => {
    // Fill in the form fields
    cy.get('#firstname').type(testData.firstName); // First Name
    cy.get('#lastname').type(testData.lastName); // Last Name
    cy.get('#email_address').type(testData.email); // Email
    cy.get('#password').type(testData.password); // Password
    cy.get('#password-confirmation').type(testData.password); // Confirm Password

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify successful account creation
    cy.url().should('include', '/customer/account/');
    cy.get('.page-title').should('contain', 'My Account');
    cy.get('.message-success').should('contain', 'Thank you for registering');
  });

  it('Should show an error for missing mandatory fields', () => {
    // Leave the form empty and click submit
    cy.get('button[title="Create an Account"]').click();

    // Verify validation errors
    cy.get('#firstname-error').should('contain', 'This is a required field.');
    cy.get('#lastname-error').should('contain', 'This is a required field.');
    cy.get('#email_address-error').should('contain', 'This is a required field.');
    cy.get('#password-error').should('contain', 'This is a required field.');
    cy.get('#password-confirmation-error').should('contain', 'This is a required field.');
  });

  it('Should show an error for an invalid email format', () => {
    // Fill in the form with an invalid email
    cy.get('#firstname').type(testData.firstName);
    cy.get('#lastname').type(testData.lastName);
    cy.get('#email_address').type('invalid-email'); // Invalid Email
    cy.get('#password').type(testData.password);
    cy.get('#password-confirmation').type(testData.password);

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify email format validation error
    cy.get('#email_address-error').should('contain', 'Please enter a valid email address (Ex: johndoe@domain.com).');
  });

  it('Should show an error for mismatched passwords', () => {
    // Fill in the form with mismatched passwords
    cy.get('#firstname').type(testData.firstName);
    cy.get('#lastname').type(testData.lastName);
    cy.get('#email_address').type(testData.email);
    cy.get('#password').type(testData.password);
    cy.get('#password-confirmation').type('WrongPassword123!'); // Mismatched password

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify password mismatch error
    cy.get('#password-confirmation-error').should('contain', 'Please enter the same value again.');
  });

  it('Should show an error when using an already registered email', () => {
    // Fill in the form with an existing email
    cy.get('#firstname').type(testData.firstName);
    cy.get('#lastname').type(testData.lastName);
    cy.get('#email_address').type('alreadyregistered@example.com'); // Replace with an actual existing email
    cy.get('#password').type(testData.password);
    cy.get('#password-confirmation').type(testData.password);

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify duplicate email error
    cy.get('.message-error').should('contain', 'There is already an account with this email address.');
  });

  it('Should validate password complexity requirements', () => {
    // Fill in the form with a weak password
    cy.get('#firstname').type(testData.firstName);
    cy.get('#lastname').type(testData.lastName);
    cy.get('#email_address').type(testData.email);
    cy.get('#password').type('123'); // Weak password
    cy.get('#password-confirmation').type('123');

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify password strength error
    cy.get('#password-error').should('contain', 'Minimum length of this field must be equal or greater than 8 symbols.');
  });

  it('Should allow manual clearing of fields', () => {
    // Fill in the form
    cy.get('#firstname').type('Pratik');
    cy.get('#lastname').type('Dutta');
    cy.get('#email_address').type('test@example.com');
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');

    // Verify fields contain input
    cy.get('#firstname').should('have.value', 'Pratik');
    cy.get('#lastname').should('have.value', 'Dutta');
    cy.get('#email_address').should('have.value', 'test@example.com');

    // Clear the fields manually
    cy.get('#firstname').clear().should('have.value', '');
    cy.get('#lastname').clear().should('have.value', '');
    cy.get('#email_address').clear().should('have.value', '');
    cy.get('#password').clear().should('have.value', '');
    cy.get('#password-confirmation').clear().should('have.value', '');

    // Verify that cleared fields can accept new input
    cy.get('#firstname').type('John').should('have.value', 'John');
    cy.get('#lastname').type('Smith').should('have.value', 'Smith');
    cy.get('#email_address').type('new@example.com').should('have.value', 'new@example.com');
  });

  it('Should show validation errors after clearing mandatory fields', () => {
    // Fill in the form
    cy.get('#firstname').type('Pratik');
    cy.get('#lastname').type('Doe');
    cy.get('#email_address').type('test@example.com');
    cy.get('#password').type('Password123!');
    cy.get('#password-confirmation').type('Password123!');

    // Clear mandatory fields
    cy.get('#firstname').clear();
    cy.get('#lastname').clear();

    // Submit the form
    cy.get('button[title="Create an Account"]').click();

    // Verify validation errors
    cy.get('#firstname-error').should('contain', 'This is a required field.');
    cy.get('#lastname-error').should('contain', 'This is a required field.');
  });
});
