# Contributing to StudentSafe

First off, thank you for considering contributing to StudentSafe! It's people like you that make StudentSafe such a great tool for community safety.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Environment details**: OS, browser, Node.js version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear description** of the feature
- **Use cases** explaining why this would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests if applicable
3. Ensure your code follows the existing style
4. Update documentation as needed
5. Write a clear commit message

#### Development Process

```bash
# Fork and clone the repo
git clone https://github.com/yourusername/StudentSafe.git
cd StudentSafe

# Create a branch
git checkout -b feature/amazing-feature

# Install dependencies
npm run install-all

# Make your changes and test
npm run dev-all

# Commit your changes
git commit -m 'Add some amazing feature'

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

### Coding Standards

- Use meaningful variable and function names
- Comment complex logic
- Keep functions small and focused
- Follow existing code style (indentation, spacing, etc.)
- Write clean, readable code

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Examples:
```
Add search functionality to incident list
Fix map not displaying on mobile devices
Update README with new installation steps
```

## Project Structure

```
StudentSafe/
├── client/                # React frontend
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # Reusable React components
│       ├── pages/        # Page-level components
│       └── App.js        # Root component
├── server/               # Express backend
│   └── index.js         # Server entry point
└── README.md            # Documentation
```

## Areas That Need Help

- **Testing**: Unit tests, integration tests
- **Documentation**: Tutorials, examples, API docs
- **Accessibility**: Making the app more accessible
- **Internationalization**: Multi-language support
- **Mobile**: React Native version
- **Database**: Persistent storage implementation

## Questions?

Feel free to:
- Open an issue with your question
- Start a discussion in GitHub Discussions
- Reach out to the maintainers

Thank you for contributing to StudentSafe! 🛡️
