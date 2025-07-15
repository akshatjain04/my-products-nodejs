Feature: Functional Testing of API Features

Background:
  Given the API base URL is set from environment variable '<base_url>'
  And the authorization header is '<authorization_token>'
  And the content type header is 'application/json'

Scenario: Upload Jira Ticket as PDF
  Given I am authenticated and have appropriate permissions to upload a file
  And the document type supported includes PDFs
  And I have a sample PDF file with Jira ticket details
  When I send a POST request to '/functional-testing/upload-jira-ticket' with the sample PDF file as payload
  Then the response status should be 201
  And the response should contain a success message with uploaded file path and prompt type
  And the file data should flow through the system components Approostio, Roost-reg, and AI Server

Scenario: PDF Parsing of Jira Ticket
  Given I have uploaded a valid PDF file containing Jira ticket information
  And the system has implemented regex for parsing description, title, and comments
  When the system processes the uploaded PDF file
  Then the response status should be 200
  And the extracted details should include 'description', 'title', and 'comments'

Scenario: Error Handling for Unsupported File Formats
  Given the system supports only file uploads in PDF format
  And I have an unsupported file format (.docx or .png) as input
  When I send a POST request to '/functional-testing/upload-jira-ticket' with the unsupported file
  Then the response status should be 400
  And the error message should be 'Unsupported file format. Please upload a PDF.'

Scenario: Verify Data Flow Across System Components
  Given I have uploaded a valid PDF file from Approostio front-end
  And the system components Approostio, Roost-reg, and AI Server are functional
  When I inspect logs at various components
  Then the logs in Roost-reg should confirm file paths and prompt types are stored correctly
  And the AI Server should have received the parsed file content for processing

Scenario: Performance of PDF Parsing
  Given I have a set of PDF files of varying sizes (small, medium, large)
  When I upload each PDF file and measure the parsing time
  Then each file should be parsed and processed within predefined performance benchmarks
  And the parsing time should remain reasonable irrespective of file size

Scenario: System Scalability with High File Volumes
  Given the system supports concurrent file uploads
  And I have a batch of 50 valid sample PDF files
  When I simulate concurrent uploads
  Then the system should remain stable without crashes or slowdowns
  And all files should be processed correctly

Scenario: Validation of File Path Storage in Roost-reg
  Given I have uploaded a valid PDF file
  When I query Roost-reg database after the upload
  Then the file path, file name, and prompt type should be correctly stored without discrepancies

Scenario: Error Recovery from Interrupted Uploads
  Given a valid PDF file is being uploaded
  And the network gets interrupted during the upload
  When the system detects an upload interruption
  Then the system should display an error message: 'Upload interrupted. Please retry.'
  Or allow the user to resume the upload from where it was interrupted
