# Vision Engine - Authentication Microservice

Responsible for handling user registration, login, and authentication. It can generate and manage JSON Web Tokens (JWT) for secure authentication.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/anandh4411/vision-engine-auth-service.git
cd vision-engine-auth-service
```

2. Install the dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory and set the following environment variables:

```bash
NODE_ENV='development'
MONGO_URL='mongodb://127.0.0.1:27017/dbname'
```

Replace the url with the URL of your mongodb database.

### Usage

1. Start the Express API Gateway:

```bash
node app.js
```

2. Or use nodemon:

```bash
npm i -g nodemon
nodemon app.js
```

### Logging (Development Only)

If you want to enable logging of incoming requests during development, set NODE_ENV=development in your .env file.

## Contributing

Contributions are welcome! If you find a bug or have any suggestions, please open an issue or submit a pull request.

### Acknowledgments

Thanks to the creators and maintainers of Express and http-proxy-middleware for their excellent libraries.

## License

This microservice is licensed under the [MIT License](LICENSE.txt).
