#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter (basic implementation)
function markdownToHtml(markdown) {
    return markdown
        // Horizontal rules
        .replace(/^---+$/gm, '<hr>')
        
        // Headers
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Bold and italic
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // Code blocks (basic)
        .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Lists (improve handling)
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        
        // Paragraphs (split on double newlines, wrap in <p>)
        .split('\n\n')
        .map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph) return '';
            if (paragraph.startsWith('<h') || 
                paragraph.startsWith('<ul') || 
                paragraph.startsWith('<ol') || 
                paragraph.startsWith('<blockquote') ||
                paragraph.startsWith('<pre') ||
                paragraph.startsWith('<hr') ||
                paragraph.includes('<li>')) {
                
                // Handle lists by wrapping consecutive <li> elements
                if (paragraph.includes('<li>')) {
                    if (markdown.includes('1. ')) {
                        return `<ol>${paragraph}</ol>`;
                    } else {
                        return `<ul>${paragraph}</ul>`;
                    }
                }
                return paragraph;
            }
            return `<p>${paragraph}</p>`;
        })
        .join('\n\n');
}

function buildSite() {
    try {
        // Paths relative to repo root (script is in .github/scripts/)
        const repoRoot = path.join(__dirname, '..', '..');
        
        // Read the expanded markdown
        const expandedMarkdownPath = path.join(repoRoot, 'charter', 'v1-expanded.md');
        if (!fs.existsSync(expandedMarkdownPath)) {
            console.error('Error: v1-expanded.md not found. Run markdown-transclusion first.');
            process.exit(1);
        }
        
        const markdownContent = fs.readFileSync(expandedMarkdownPath, 'utf8');
        
        // Convert markdown to HTML
        const htmlContent = markdownToHtml(markdownContent);
        
        // Read the template
        const templatePath = path.join(repoRoot, 'index-template.html');
        if (!fs.existsSync(templatePath)) {
            console.error('Error: index-template.html not found.');
            process.exit(1);
        }
        
        const template = fs.readFileSync(templatePath, 'utf8');
        
        // Replace the placeholder with actual content
        const finalHtml = template.replace(
            '<div id="charter-content" class="prose prose-lg max-w-none">',
            `<div id="charter-content" class="prose prose-lg max-w-none">\n${htmlContent}`
        ).replace(
            '<!-- This is where the processed charter content would go -->\n                <div class="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">\n                    <h3 class="text-xl font-semibold text-blue-900 mb-4">Charter Content</h3>\n                    <p class="text-blue-700">\n                        The full Charter content would be inserted here after processing through markdown-transclusion.\n                    </p>\n                    <p class="text-sm text-blue-600 mt-4">\n                        This template shows the structure - the actual content would replace this placeholder.\n                    </p>\n                </div>',
            ''
        );
        
        // Write the final HTML
        const outputPath = path.join(repoRoot, 'index.html');
        fs.writeFileSync(outputPath, finalHtml);
        
        console.log('✅ Site built successfully!');
        console.log(`📄 Output: ${outputPath}`);
        console.log(`📊 Size: ${Math.round(finalHtml.length / 1024)}KB`);
        
    } catch (error) {
        console.error('❌ Error building site:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    buildSite();
}

module.exports = { buildSite };