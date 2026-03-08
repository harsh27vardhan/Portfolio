require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schema and Model
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Routes
app.get('/api/visits', async (req, res) => {
    try {
        let visitor = await Visitor.findOne();

        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count++;
        }

        await visitor.save();
        res.json({ count: visitor.count });
    } catch (err) {
        console.error('Error fetching/updating visitor count:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/api/github', async (req, res) => {
    try {
        const query = `
        {
          user(login: "harsh27vardhan") {
            name
            bio
            location
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
            contributionsCollection {
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalRepositoryContributions
              
              contributionCalendar {
                totalContributions
              }
            }
         
            repositories(first: 100, ownerAffiliations: OWNER) {
              totalCount
              nodes {
                name
                description
                url
                createdAt
                updatedAt
                stargazerCount
                forkCount
                isPrivate
                
                primaryLanguage {
                  name
                }
         
                languages(first: 10) {
                  nodes {
                    name
                  }
                }
         
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
         
            starredRepositories(first: 50) {
              totalCount
              nodes {
                name
                url
                stargazerCount
              }
            }
         
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
        `;

        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PAT}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching GitHub data:', err);
        res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
