// para ocultar secciones
document.querySelectorAll(".toggle").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const id = btn.getAttribute("aria-controls");
    const target = document.getElementById(id);
    const expanded = btn.getAttribute("aria-expanded")==="true";
    btn.setAttribute("aria-expanded", String(!expanded));
    if (expanded) target.setAttribute("hidden","");
    else target.removeAttribute("hidden");
  });
});


// para hacerl el modo oscuro
const themeToggle = document.getElementById("themeToggle");
if (themeToggle){
  const apply = isDark => document.body.classList.toggle("dark", isDark);
  apply(false);
  themeToggle.addEventListener("click", ()=>{
    const isDark = !document.body.classList.contains("dark");
    apply(isDark);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  });
}
