# Mock Test Feature

## Features

### Mock Test Functionality
1. **Question Management**:
   - Questions are stored in a dedicated table (`questions` collection in MongoDB).
   - Questions include fields like `id`, `content`, `options`, and `correctAnswer`.

2. **User Management**:
   - Users are tracked in a `users` collection with fields like `id`, `name`, `email`, and `completedQuestions` (array of question IDs).

3. **Unique Questions per Test**:
   - Ensures no repeated questions for a user in multiple mock tests by tracking `completedQuestions`.

4.-**Fetch Mock Test Questions**:
     - Retrieve a set of new questions not already answered by the user.
   - **Submit Answers**:
     - Validate user answers and update their `completedQuestions` array.

5. **Error Handling**:
   - Graceful messages for invalid operations (e.g., no questions available).
   - A particular cannot attempt the test again once submitted
   - Scores are calculated properly
   

6. **Tech Stack**:
   - Backend: Node.js with TypeScript.
   - Database: MongoDB.
  

---
## Steps to Run the Code

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=<your-mongo-db-uri>
   ```

### Running the Application
1. Start the server:
   ```bash
   npm run dev
   ```

2. Populate sample questions:
   ```bash
   npm run populate-questions
   ```

---




