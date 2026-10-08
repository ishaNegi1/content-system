<h1>Content Publishing System</h1>

<h2>1. Overview</h2>

<p>I created a small content publishing tool using two Next.js apps and Sanity as the CMS. The first application is be used to add and post text. The second application shows the published content to users. Both applications are deployed separately on Vercel.</p>

<h2>2. Architecture</h2>

<p>The overall process is:</p>

<p><strong>Publisher → Sanity CMS → Website</strong></p>

<ul>
  <li><strong>Publisher:</strong> To enter title and description and publish the content.</li>
  <li><strong>Sanity:</strong> Stores the published content and provides it through its API.</li>
  <li><strong>Website:</strong> Fetches the newest published content from Sanity and shows it.</li>
</ul>

<h2>3. CSR and SSR</h2>

<p>CSR is used in a page that has a form and requires user interaction, so I used on the Publisher app. The publish request is made from browser to API route.</p>

<p>I used SSR in the Website app because the content needs to be pulled from the server prior to showing the page. This also will help to lighten the work on the client side.</p>

<h2>4. CMS</h2>

<p>For the content to be stored without being associated to the applications I used Sanity as the CMS. The Publisher sends the content to Sanity through its API. The Website then read the published content from the same CMS. This enables the sharing of the same content with both applications.</p>

<h2>5. Latency and Caching</h2>

<p>I used the <code>performance.now()</code> method to measure how much time it takes to get content from Sanity. Initially, I used caching with a revalidation time to reduce repeated API requests and improve response time.</p>

<p>When doing testing, I found that there was an issue with content sometimes not getting updated quickly because of caching issues. Experimented with different caching configurations to get an idea of what the problem might be.</p>

<p>I thought that the primary conflict was:</p>

<ul>
  <li>The more cached the more the better it will perform, however this may lead to the content not being updated within a short time.</li>
  <li>Not so much caching - new content but more access requests to the CMS.</li>
</ul>

<h2>6. Issues encountered and solutions</h2>

<h3>Problem 1: Issue with content not updating immediately.</h3>

<p>Occasionally the site displayed previous information after publishing information.</p>

<p><strong>Solution:</strong> checked the caching behaviour, and tested the application without cache to determine if caching caused the problem.</p>

<h3>Problem 2: CMS and applications needed to share data.</h3>

<p>Can't store content only within one application, as these two applications were independent of each other.</p>

<p><strong>Solution:</strong> implemented a common CMS, Sanity. The Publisher publishes to the Sanity and the Website reads from the Sanity.</p>

<h2>7. Deployment</h2>

<p>I deployed them as two different applications on Vercel.</p>

<ul>
  <li><strong>Publisher application</strong> → Vercel</li>
  <li><strong>Website application</strong> → Vercel</li>
</ul>

<p>The Sanity Studio is used for CMS management, without deploying it to Vercel.</p>

<h2>8. Final Flow</h2>

<p>The final flow is:</p>

<ol>
  <li>Enter the title and content in the Publisher by the user.</li>
  <li>User clicks Publish.</li>
  <li>The Publisher sends the data to Sanity.</li>
  <li>The published content is stored in Sanity.</li>
  <li>The user is taken to the Website.</li>
  <li>The Site gets the published content from Sanity by using SSR.</li>
  <li>Content is displayed on the Website.</li>
</ol>
