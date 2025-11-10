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
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(186, 224, 82, 1);"></div>
                    <div>Atlas de la Biodiversité Communale ou Intercommunale (ABC/ABI)</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>Un Atlas de la biodiversité</strong> est un inventaire des milieux et espèces présents sur un territoire donné. Il implique l'ensemble des acteurs d'une collectivité en faveur de la préservation du patrimoine naturel. <em>Ce</em> <em>dispositif est piloté par l'Office français de la biodiversité.</em>
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare hatch-square-tvb" style=""></div>
                    <div>Trames Verte et Bleue (TVB)</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(229, 217, 53, 1);"></div>
                    <div>Territoires Engagés pour la Nature (TEN)</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    Définition
                </div>
            </div>
            
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(27, 33, 141, 1);"></div>
                    <div>Solutions d'adaptation fondées sur la Nature (SafN)</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>Les Solutions d’adaptation fondées sur la Nature (SafN)</strong> : sont des actions visant à protéger, gérer de manière durable et restaurer des écosystèmes naturels ou modifiés pour l'adaptation au changement climatique, tout en assurant le bien-être humain et en produisant des bénéfices pour la biodiversité.
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare hatch-square-strat" style=""></div>
                    <div>Stratégie - plan d'actions</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>Territoires Engagés pour la Nature (TEN)</strong> est une initiative visant à faire émerger, reconnaître et valoriser les plans d’actions en faveur de la biodiversité portés par les communes et EPCI pendant 3 ans. <em>Ce</em> <em>dispositif est piloté par l'Office français de la biodiversité.</em>
                </div>
            </div>
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <div class="lgdCustom__symbolSquare" style="background-color:rgba(0, 0, 0, 1);"></div>
                    <div>Recherche – action</div>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>La recherche action</strong> est complémentaire de la recherche fondamentale, elle est délibérément dirigée vers un objectif pratique. Elle est induite par les questions des acteurs professionnels, implique ces derniers et des chercheur·ses tout en mobilisant des méthodes scientifiques.
                </div>
            </div>     
            <div class="tooltip-container">
                <div class="tooltip-trigger">                    
                    <span class="lgdCustom__symbolRound" style="color:rgba(67, 215, 150, 1)">⬤</span><span>Aires terrestres éducatives (ATE)</span>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>Les Aires éducatives </strong>sont des petits bouts de territoires gérés de manière participative par les élèves d’une école, d’un collège ou d’un lycée, accompagnés d’une équipe enseignante et d’une structure de l’éducation à l’environnement. <em>Ce</em> <em>dispositif est piloté par l'Office français de la biodiversité.</em>
                </div>
            </div> 
            <div class="tooltip-container">
                <div class="tooltip-trigger">
                    <span class="lgdCustom__symbolRound" style="color:#0025FF">⬤</span><span>Aires marines éducatives (AME)</span>
                </div>
                <div class="lgdcustom-tooltip" role="tooltip">
                    <strong>Les Aires éducatives </strong>sont des petits bouts de territoires gérés de manière participative par les élèves d’une école, d’un collège ou d’un lycée, accompagnés d’une équipe enseignante et d’une structure de l’éducation à l’environnement. <em>Ce</em> <em>dispositif est piloté par l'Office français de la biodiversité.</em>
                </div>
            </div>                        
          </div>
          <button class="btn btn-outline-primary btn-sm btn-custom-filter" data-bs-original-title="Filtrer les projets" onclick="filter.toggle();">
              Filtrer les projets
          </button>
        </div>
      `;
      target.insertAdjacentHTML("afterend", lgdcustom);
      setupTooltips();
      clearInterval(_interval);
      _interval = null;
    }
  }

function setupTooltips() {
  document.querySelectorAll("#projetsBioLgdCustom .tooltip-container").forEach((container) => {
    const trigger = container.querySelector(".tooltip-trigger");
    const tooltip = container.querySelector(".lgdcustom-tooltip");

    if (!trigger || !tooltip) return;

    function calculateTooltipPosition() {
      const rect = trigger.getBoundingClientRect();
      const tooltipHeight = tooltip.offsetHeight || 60;
      const padding = 8;
      const viewportHeight = window.innerHeight;

      let top, left, transform, placement;

      if (rect.top > tooltipHeight + padding) {
        top = rect.top - padding;
        left = rect.left + rect.width / 2;
        transform = "translate(-50%, -100%)";
        placement = "top";
      }
      else if (viewportHeight - rect.bottom > tooltipHeight + padding) {
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2;
        transform = "translate(-50%, 0)";
        placement = "bottom";
      }

      return { top, left, transform, placement };
    }

    function showTooltip() {
      document.body.appendChild(tooltip);
      tooltip.style.position = "fixed";
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.pointerEvents = "none";

      requestAnimationFrame(() => {
        const { top, left, transform } = calculateTooltipPosition();
        Object.assign(tooltip.style, {
          top: `${top}px`,
          left: `${left}px`,
          transform,
          opacity: "1",
          visibility: "visible",
          pointerEvents: "auto",
          zIndex: "9999"
        });
      });
    }

    function hideTooltip() {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.pointerEvents = "none";
      container.appendChild(tooltip);
    }

    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = tooltip.style.visibility === "visible";
      document.querySelectorAll("#projetsBioLgdCustom .lgdcustom-tooltip").forEach((t) => {
        t.style.opacity = "0";
        t.style.visibility = "hidden";
        t.style.pointerEvents = "none";
      });
      if (!isActive) showTooltip();
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll("#projetsBioLgdCustom .lgdcustom-tooltip").forEach((tooltip) => {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.pointerEvents = "none";
      const container = document.querySelector(
        `#projetsBioLgdCustom .tooltip-container:has(.tooltip-trigger)`
      );
      if (container && !container.contains(tooltip)) container.appendChild(tooltip);
    });
  });
}

  return {
    init: function () {
      if (_initialized) return;
      _initialized = true;
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
