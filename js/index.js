import { bd } from "./bd.js";

const getSectionResultElements = () => {
  return {
    sectionResult: document.getElementById("result"),
  };
};

const getSectionSearchElements = () => {
  return {
    searchIcon: document.getElementById("search-icon"),
    clearIcon: document.getElementById("clear-icon"),
  };
};

const initCards = () => {
  const { sectionResult } = getSectionResultElements();
  bd.forEach((language) => {
    sectionResult.innerHTML += `
          <div class="card">
            <div class="card-partition">
              <i
                class="devicon-${language.name.toLowerCase()}-plain colored"
              ></i>
            </div>

            <div class="card-partition">
              <h2>${language.name}</h2>
              <p>${language.description}</p>
              <div class="hello-world">
                <span>Hello World:</span>
                <pre><code class="preview">${language.helloWorld}</code></pre>
              </div>
              <div class="studing">
                <span>Começe agora a aprender:</span>
                <ul>
                  <li>
                    <a href="${language.linkEstudo}" target="_blank">
                      ${language.linkEstudo}
                    </a>
                  </li>
                  <li>
                    <a href="${language.linkDocumentacao}" target="_blank">
                      ${language.linkDocumentacao}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;
  });
};

window.onload = () => {
  initCards();

  // Selecionar todos os blocos de código após a inserção
  const codeBlocks = document.querySelectorAll("code.preview");
  codeBlocks.forEach((codeBlock) => {
    hljs.highlightElement(codeBlock);
  });
};
