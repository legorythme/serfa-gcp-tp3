/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("async function getTickets() {\n  try {\n    const call = await fetch(\"/api/tickets\");\n    const data = await call.json();\n    return data;\n  } catch (error) {\n    console.error(\"Error:\", error);\n    return [];\n  }\n}\n\n// when my HTML page is full loaded, trigger that code\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\n  console.log(\"javascript is loaded\");\n\n  let tickets = [];\n  tickets = await getTickets();\n\n  // generate HTML for each ticket row\n  tickets.forEach((ticket) => {\n    const tr = document.createElement(\"tr\");\n    tr.innerHTML = `\n            <td>${ticket.id}</td>\n            <td>${ticket.title}</td>\n            <td>${ticket.description}</td>\n            <td>\n                <span class=\"status-label ${ticket.status === \"Assigned\" ? \"assigned\" : \"unassigned\"}\">${ticket.status}</span>\n            </td>\n            <td>${ticket.assignedTo || \"-\"}</td>\n            <td class=\"action-buttons\">\n                <button class=\"button\" onclick=\"deleteTicket(${ticket.id})\">Delete</button>\n                <button class=\"button\" onclick=\"assignTicket(${ticket.id})\">Assign</button>\n            </td>\n        `;\n    document.querySelector(\"tbody\").appendChild(tr);\n  });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCLGtCQUFrQixhQUFhO0FBQy9CLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQSw0Q0FBNEMseURBQXlELElBQUksY0FBYztBQUN2SDtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQSwrREFBK0QsVUFBVTtBQUN6RSwrREFBK0QsVUFBVTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BlcmZlY3QtdGlja2V0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgZnVuY3Rpb24gZ2V0VGlja2V0cygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjYWxsID0gYXdhaXQgZmV0Y2goXCIvYXBpL3RpY2tldHNcIik7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGNhbGwuanNvbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vLyB3aGVuIG15IEhUTUwgcGFnZSBpcyBmdWxsIGxvYWRlZCwgdHJpZ2dlciB0aGF0IGNvZGVcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJqYXZhc2NyaXB0IGlzIGxvYWRlZFwiKTtcblxuICBsZXQgdGlja2V0cyA9IFtdO1xuICB0aWNrZXRzID0gYXdhaXQgZ2V0VGlja2V0cygpO1xuXG4gIC8vIGdlbmVyYXRlIEhUTUwgZm9yIGVhY2ggdGlja2V0IHJvd1xuICB0aWNrZXRzLmZvckVhY2goKHRpY2tldCkgPT4ge1xuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRyLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDx0ZD4ke3RpY2tldC5pZH08L3RkPlxuICAgICAgICAgICAgPHRkPiR7dGlja2V0LnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHt0aWNrZXQuZGVzY3JpcHRpb259PC90ZD5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0YXR1cy1sYWJlbCAke3RpY2tldC5zdGF0dXMgPT09IFwiQXNzaWduZWRcIiA/IFwiYXNzaWduZWRcIiA6IFwidW5hc3NpZ25lZFwifVwiPiR7dGlja2V0LnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPHRkPiR7dGlja2V0LmFzc2lnbmVkVG8gfHwgXCItXCJ9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFjdGlvbi1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIG9uY2xpY2s9XCJkZWxldGVUaWNrZXQoJHt0aWNrZXQuaWR9KVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIiBvbmNsaWNrPVwiYXNzaWduVGlja2V0KCR7dGlja2V0LmlkfSlcIj5Bc3NpZ248L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIGA7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRib2R5XCIpLmFwcGVuZENoaWxkKHRyKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;