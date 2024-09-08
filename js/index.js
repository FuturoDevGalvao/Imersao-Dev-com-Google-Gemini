import { bd } from "./bd.js";

const getSectionResultElements = () => {
  return {
    sectionResult: document.getElementById("result"),
  };
};

const getSectionSearchElements = () => {
  return {
    searchInput: document.getElementById("search-input"),
    searchIcon: document.getElementById("search-icon"),
    clearIcon: document.getElementById("clear-icon"),
  };
};

const initCards = (data = bd) => {
  const { sectionResult } = getSectionResultElements();

  sectionResult.innerHTML = "";

  data.forEach((language) => {
    // Renderizando os links de escolas/estudo
    const schoolLinks = Object.entries(language.links.schools)
      .map(([key, url]) =>
        `<li>
          <a href="${url}" target="_blank">${getActions()["capitalizeFirstLetter"](key)}</a>
        </li>`
      )
      .join("");

    // Renderizando os links de playlists (se houver)
    const playlistLinks = language.links.playlists.length 
          ? language.links.playlists
          .map((playlistLink) => `<li><a href="${playlistLink}" target="_blank">YouTube</a></li>`)
          .join("") 
          : "<li>Nenhuma playlist disponível</li>";

    sectionResult.innerHTML += `
      <div class="card">
        <div class="card-partition">
          <i class="devicon-${language.name.toLowerCase()}-plain colored"></i>
        </div>

        <div class="card-partition">
          <h2>${language.name}</h2>
          <p>${language.description}</p>
          <div class="hello-world">
            <span>Hello World:</span>
            <pre><code class="preview">${language.helloWorld}</code></pre>
          </div>
          <div class="studing">
            <span>Comece agora a aprender:</span>
            <ul>
              <li><span>Escolas de tenologias:</span></li>
              <ul>
                ${schoolLinks}
                <li>
                  <a href="https://www.google.com/search?q=curso+${language.name}" target="_blank">
                    Confira mais no google
                  </a>
                </li>
              </ul>
              <li><span>Playlists:</span></li>
              <ul>
                ${playlistLinks}
                <li>
                  <a href="https://www.google.com/search?q=playlist+curso+${language.name}" target="_blank">
                    Confira mais no google
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    `;
  });
};

const getActions = () => {
  const actions = {
    clearSearchInput: (input) => {
      input.value = "";
      initCards();
    },

    search: (input) => {
      const termOfSearch = input.value.trim().toLowerCase();

      initCards(actions.filter(termOfSearch));
    },

    focus: (input = null) => {
      if (input) input.focus();
    },

    filter: (termOfSearch) =>
      bd.filter((language) =>
        language.name.toLowerCase().includes(termOfSearch)
      ),

    capitalizeFirstLetter: (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    writerEfect: (element) => {
      var typewriter = new Typewriter(element, {
        loop: true,
        delay: 75,
      });

      typewriter
        .pauseFor(1500)
        .typeString('Codepedia')
        .pauseFor(1000)
        .deleteChars(10)
        .typeString('<strong>"Imersao Dev"</strong>')
        .pauseFor(1000)
        .deleteChars(13)
        .typeString('<span>"Google Gemini"</span>')
        .pauseFor(1000)
        .start();
      },
  };

  return actions;
};

const addListenerOnElements = () => {
  const { searchInput, clearIcon } = getSectionSearchElements();

  console.log(searchInput);

  clearIcon.addEventListener("click", () =>
    getActions()["clearSearchInput"](searchInput)
  );

  searchInput.addEventListener("input", () =>
    getActions()["search"](searchInput)
  );

  addKeyboardShortcut(searchInput);
};

const addKeyboardShortcut = (input) => {
  let pressedKeys = new Set();

  const shortcutCombinations = {
    "control+x": getActions()["focus"],
  };

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    pressedKeys.add(key);

    const shortcut = Array.from(pressedKeys).sort().join("+");
    if (shortcutCombinations[shortcut]) {
      shortcutCombinations[shortcut](input);
      pressedKeys.clear(); // Limpa as teclas pressionadas após o atalho
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    pressedKeys.delete(key); // Remove a tecla solta
  });
};

window.onload = () => {
  initCards();
  addListenerOnElements();
  getActions()["writerEfect"](logo);
};
