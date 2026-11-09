/*
  IT 402 CLASS X — PDF catalogue
  Upload all PDFs into the "pdfs" folder.
  IMPORTANT: Windows may hide ".pdf" extensions. The filenames below include .pdf.
*/
const documentationChapters = [
  {title:"Advanced Features of Writer", subtitle:"Digital Documentation • LibreOffice Writer", files:[
    {label:"Detailed Notes", fileName:"Advanced Features of Writer - Complete Theory & Exam Notes.pdf"},
    {label:"Quick Revision", fileName:"Advanced_Features_Notebook_quick revision.pdf"}]},
  {title:"Introduction to Styles", subtitle:"Digital Documentation • LibreOffice Writer", files:[
    {label:"Detailed Notes", fileName:"Introduction_to_Styles_Complete_Theory_Exam_Notes.pdf"},
    {label:"Quick Revision", fileName:"INTRO TO STYLES - QUICK REVISION.pdf"}]},
  {title:"Working with Images", subtitle:"Digital Documentation • LibreOffice Writer", files:[
    {label:"Detailed Notes", fileName:"Working with Images - Complete Theory & Exam Notes.pdf"},
    {label:"Quick Revision", fileName:"Working_With_Images_quick revision.pdf"}]}
];

const spreadsheetChapters = [
  {title:"Analyse Data Using Scenarios and Goal Seek", subtitle:"Electronic Spreadsheet • LibreOffice Calc", files:[
    {label:"Detailed Notes", fileName:"ANALYSE DATA WITH SCENARIOS AND GOAL SEEK.pdf"},
    {label:"Quick Revision", fileName:"Analyse_Data_using Scenario and goal seek- quick revision.pdf"}]},
  {title:"Linking Spreadsheet Data", subtitle:"Electronic Spreadsheet • LibreOffice Calc", files:[
    {label:"Detailed Notes", fileName:"Linking_Spreadsheet_Data_Detailed_Notes.pdf"},
    {label:"Quick Revision", fileName:"Linking_Spreadsheet_Data.pdf"}]},
  {title:"Macros", subtitle:"Electronic Spreadsheet • LibreOffice Calc", files:[
    {label:"Detailed Notes", fileName:"Macros.pdf"},
    {label:"Quick Revision", fileName:"Macrosqr.pdf"}]},
  {title:"Share and Review a Spreadsheet", subtitle:"Electronic Spreadsheet • LibreOffice Calc", files:[
    {label:"Detailed Notes", fileName:"share and review a spreadsheet.pdf"},
    {label:"Quick Revision", fileName:"Share_and_Review a spreadsheet.pdf"}]}
];

function urlFor(fileName) {
  return "pdfs/" + fileName.split("/").map(part => encodeURIComponent(part)).join("/");
}
function renderChapters(items, containerId, prefix) {
  const root = document.getElementById(containerId);
  root.innerHTML = items.map((chapter, index) => `
    <article class="chapter-card" data-search="${(chapter.title+" "+chapter.subtitle+" "+chapter.files.map(file=>file.fileName+" "+file.label).join(" ")).toLowerCase()}">
      <div class="chapter-head">
        <div class="chapter-num">${prefix}${index+1}</div>
        <div><h3>${chapter.title}</h3><p class="subtitle">${chapter.subtitle}</p></div>
      </div>
      <div class="actions">
        <a class="pdf-btn" href="${urlFor(chapter.files[0].fileName)}" target="_blank" rel="noopener">▤ View Detailed Notes</a>
        <a class="pdf-btn download" href="${urlFor(chapter.files[0].fileName)}" download="${chapter.files[0].fileName}">↓ Download</a>
        <a class="pdf-btn" href="${urlFor(chapter.files[1].fileName)}" target="_blank" rel="noopener">⚡ View Quick Revision</a>
        <a class="pdf-btn download" href="${urlFor(chapter.files[1].fileName)}" download="${chapter.files[1].fileName}">↓ Download</a>
      </div>
    </article>`).join("");
}
renderChapters(documentationChapters, "documentation-list", "D");
renderChapters(spreadsheetChapters, "spreadsheet-list", "E");

document.getElementById("search").addEventListener("input", function() {
  const query = this.value.trim().toLowerCase();
  document.querySelectorAll(".chapter-card").forEach(card => {
    card.hidden = !card.dataset.search.includes(query);
  });
  document.querySelectorAll(".subject-section").forEach(section => {
    const cards = [...section.querySelectorAll(".chapter-card")];
    section.hidden = query.length > 0 && !cards.some(card => !card.hidden);
  });
});


// Student instructions popup
(function () {
  const popup = document.getElementById("instructionPopup");
  const closeButton = document.getElementById("closePopup");
  const continueButton = document.getElementById("continueButton");
  if (!popup) return;
  function closePopup() {
    popup.classList.add("popup-hidden");
  }
  closeButton?.addEventListener("click", closePopup);
  continueButton?.addEventListener("click", closePopup);
  popup.addEventListener("click", function (event) {
    if (event.target === popup) closePopup();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closePopup();
  });
})();
