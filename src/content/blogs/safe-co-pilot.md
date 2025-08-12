---
title: What Makes a Safe Database Co-Pilot?
date: July 28, 2025
image: /architecture.png
excerpt: Discover how Incerto ensures complete data security. Learn about on-premise deployment, AI guardrails, and why your data never leaves your VPC.
---

# What Makes a Safe Database Co-Pilot?

Let's understand what security means for AI-powered database tools. Incerto is completely safe and production tested.

## Security First

When AI touches your databases, security becomes critical. Your data is your business, which should never be compromised.

> "A safe Co-Pilot must protect your data like your most trusted team member."

![Incerto Architecture - Safe by Design](/architecture.png)

## The Problem with Cloud-Based AI Tools

Most AI database tools send your data to external servers. This creates risks:

- Your sensitive data travels over the internet.
- Third-party servers store your database information.
- You lose control over your data.
- Compliance becomes complex.

## What Makes Incerto Different?

**On-Premise Deployment.** Everything runs inside your infrastructure (except calls to LLMs). You have full control.

Your data never leaves your Virtual Private Cloud (VPC). Incerto operates entirely within your network.

- We don't index any data, no RAG on your tables.
- We don't store anything in memory either, it's upto you to add important context or auto-attatch them.
- Not a bit of data is sent out, you can air gap the product.

> "A safe Co-Pilot must never send your data outside your network."


## Agent's just WISH

Following is an image from the product, where we tried to delete data telling it explicitly not to ask for permission. But it still did. That is because we don't use MCP, they can't execute any query any where. It can just route it's "wish to execute". 

> "AI agents send requests to frontend. Only user approval executes queries."

![AI Guardrails in Action](/safe.png)

All readonly operation run with setting which ensure that query can't possible by any sideffect.

## Transperancy

The frontend shows exactly what will happen.

- Write operations have bold red UI.
- You see the exact SQL/Function/Command before execution.
- No surprises, no unauthorized changes.
- Each bit of context from our context engine is visible on our frontend. If it's not visible it's not there. 


## Tool Output is Limited

AI agents get truncated responses. This forces them to be precise.

- Maximum 1000 characters per response.
- Agents must be efficient.
- No data leakage through verbose outputs.

## Knowledge Base

Their is an optional feature to sync your local knowledge database to our private online database. But it's strictly a GET request which is disabled by default.

Incerto uses knowledge base to detect known production issues in your databases, with readonly user. 

## What Does This Mean for You?

Your data stays yours. Your control remains absolute. Your security policies are respected.

> "Incerto gives you AI power without compromising your security."

We'll explore more technical details in our next blog post.

In the meantime, feel free to reach out with any questions. I am available at [LinkedIn](https://www.linkedin.com/in/anurag-pandey-5a11ba113/). 