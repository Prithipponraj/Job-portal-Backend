# Job Portal Backend

This is the backend service for the Job Portal application. It provides API endpoints to manage users, jobs, applications, and admin functionalities. The service uses Node.js, Express.js, MongoDB, and Cloudinary for file uploads.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Prithipponraj/Job-portal-Backend
    ```

2. Navigate to the project directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add your environment variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

### Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:5000`.

## API Endpoints

### User Routes
- **POST /api/v1/register** - Register a new user.
- **POST /api/v1/login** - Login a user.
- **GET /api/v1/isLogin** - Check if a user is logged in.
- **GET /api/v1/me** - Get the logged-in user's profile.
- **PUT /api/v1/changePassword** - Change the logged-in user's password.
- **PUT /api/v1/updateProfile** - Update the logged-in user's profile.
- **PUT /api/v1/deleteAccount** - Delete the logged-in user's account.

### Job Routes
- **POST /api/v1/create/job** - Create a new job (admin only).
- **GET /api/v1/jobs** - Get all jobs.
- **GET /api/v1/job/:id** - Get a single job by ID.
- **GET /api/v1/saveJob/:id** - Save/Unsave a job for the logged-in user.
- **GET /api/v1/getSavedJobs** - Get all saved jobs for the logged-in user.

### Application Routes
- **POST /api/v1/createApplication/:id** - Create a new application for a job.
- **GET /api/v1/singleApplication/:id** - Get a single application by ID.
- **GET /api/v1/getAllApplication** - Get all applications for the logged-in user.
- **DELETE /api/v1/deleteApplication/:id** - Delete an application by ID.

### Admin Routes
- **GET /api/v1/admin/allJobs** - Get all jobs (admin only).
- **GET /api/v1/admin/allUsers** - Get all users (admin only).
- **GET /api/v1/admin/allApp** - Get all applications (admin only).
- **GET /api/v1/admin/getApplication/:id** - Get a single application by ID (admin only).
- **PUT /api/v1/admin/updateApplication/:id** - Update an application by ID (admin only).
- **DELETE /api/v1/admin/deleteApplication/:id** - Delete an application by ID (admin only).
- **GET /api/v1/admin/getUser/:id** - Get a single user by ID (admin only).
- **PUT /api/v1/admin/updateUser/:id** - Update a user by ID (admin only).
- **DELETE /api/v1/admin/deleteUser/:id** - Delete a user by ID (admin only).
- **GET /api/v1/admin/getJob/:id** - Get a single job by ID (admin only).
- **PUT /api/v1/admin/updateJob/:id** - Update a job by ID (admin only).
- **DELETE /api/v1/admin/deleteJob/:id** - Delete a job by ID (admin only).

---

## Postman Documentation

You can import the following Postman collection to test all the API endpoints:

[![Run in Postman](https://blue-eclipse-542604.postman.co/workspace/New-Team-Workspace~108cee49-a4e8-42e8-9ce1-350c02164619/collection/38651253-44b169af-4f46-43cc-be11-523ded94398a?action=share&creator=38651253)

### Steps to Import Postman Collection
1. Click the **Run in Postman** button above.
2. This will open Postman and import the collection.
3. Set up environment variables in Postman for `base_url`, `token`, etc., as required by the endpoints.
4. Test all the API endpoints directly from Postman.

---

## Example Data

### User Registration
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
  "resume": "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrpO0",
  "skills": ["JavaScript", "React", "Node.js"]
}
### User Login
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
### Update Profile
```json
{
  "name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
  "resume": "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrpO0",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript"]
}
### Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code follows the existing style and includes tests for new features.

Feel free to update the repository and project-specific details to match your actual setup. This will help other developers (or yourself in the future) understand the structure and purpose of your project!

