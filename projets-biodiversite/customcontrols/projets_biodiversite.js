const layerid = "projets_biodiversite";

const cc = (function () {
  let _initialized = false;
  let _interval = null;

  function insertLegend() {
    const target = document.querySelector(
      '.list-group-item[data-layerid="projets_biodiversite"] .layerdisplay-title'
    );

    if (target && !document.querySelector("#projetsBioLgdCustom")) {
      const lgdcustom = `
        <div id="projetsBioLgdCustom">
          <div class="lgdCustom__list">
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(0, 0, 0, 1);"></div>
                    <div>Recherche Action</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(27, 33, 141, 1);"></div>
                    <div>Solution d'adaptation fondées sur la Nature (SafN)</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare hatch-square-strat" style=""></div>
                    <div>Stratégie - plan d'actions</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(229, 217, 53, 1);"></div>
                    <div>Territoires engagés pour la nature (TEN)</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare hatch-square-tvb" style=""></div>
                    <div>Trame verte et bleue (TVB)</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(186, 224, 82, 1);"></div>
                    <div>Atlas de la biodiversité (ABC)</div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>            
            <div class="lgdCustom__subLabel">Les aires éducatives</div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div><span class="lgdCustom__symbolRound" style="color:rgba(74,36,252, 1)">⬤</span><span>Aire marine</span></div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">                    
                    <div><span class="lgdCustom__symbolRound" style="color:rgba(67, 215, 150, 1)">⬤</span><span>Aire terrestre</span></div>
                </div>
                <div class="tooltip" role="tooltip">
                    Définition
                </div>
            </div>
          </div>
        </div>
      `;
      target.insertAdjacentHTML("afterend", lgdcustom);
      clearInterval(_interval);
      _interval = null;
    }
  }

  // Gestion du clic pour mobile
document.querySelectorAll("#projetsBioLgdCustom .tooltip-container").forEach((container) => {
  const trigger = container.querySelector(".tooltip-trigger");
  trigger.addEventListener("click", (e) => {
    e.stopPropagation(); // évite de propager le clic
    // Ferme les autres tooltips
    document.querySelectorAll("#projetsBioLgdCustom .tooltip-container.active").forEach((c) => {
      if (c !== container) c.classList.remove("active");
    });
    // Active/désactive celui-ci
    container.classList.toggle("active");
  });
});

// Fermer le tooltip si on clique ailleurs
document.addEventListener("click", () => {
  document.querySelectorAll("#projetsBioLgdCustom .tooltip-container.active").forEach((c) =>
    c.classList.remove("active")
  );
});

  return {
    init: function () {
      if (_initialized) return;
      _initialized = true;

      // Si l’élément n’est pas encore dispo, on réessaie quelques secondes
      insertLegend();
      if (!_interval) _interval = setInterval(insertLegend, 500);
    },

    destroy: function () {
      _initialized = false;
      if (_interval) {
        clearInterval(_interval);
        _interval = null;
      }
      const el = document.querySelector("#projetsBioLgdCustom");
      if (el) el.remove();
    },
  };
})();

new CustomControl(layerid, cc.init, cc.destroy);
