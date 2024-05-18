import React from 'react';
import { useRouter } from 'next/router';

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/example',
    requestBody: null,
    response: '{ "data": "example" }',
  },
];

const Page: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Documentation</h1>
      <section>
        <h2>Overview</h2>
        <p>This documentation provides an overview of the available API endpoints.</p>
      </section>
      {apiEndpoints.length === 0 ? (
        <section>
          <p>No API endpoints configured.</p>
        </section>
      ) : (
        <section>
          <h2>Endpoints</h2>
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3 style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleNavigation(endpoint.path)}>
                {endpoint.method} {endpoint.path}
              </h3>
              {endpoint.requestBody && (
                <>
                  <h4>Request Body</h4>
                  <pre>
                    <code>{endpoint.requestBody}</code>
                  </pre>
                </>
              )}
              <h4>Response</h4>
              <pre>
                <code>{endpoint.response}</code>
              </pre>
            </div>
          ))}
        </section>
      )}
      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>&copy; {new Date().getFullYear()} Created by Yusupkakuu</p>
      </footer>
    </div>
  );
};

export default Page;
