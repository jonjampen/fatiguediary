<!DOCTYPE html>
<html lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../../assets/fonts/materialicons.css">
<link rel="stylesheet" href="Dashboard-Dateien/general.css">
<link rel="icon" type="image/x-icon" href="Dashboard-Dateien/logo.svg">
<link rel="stylesheet" type="text/css" href="Dashboard-Dateien/toastify.min.css">
<title>Dashboard</title>
<link rel="stylesheet" href="Dashboard-Dateien/app.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/css/shepherd.css"/>
<style id="apexcharts-css">.apexcharts-canvas {
  position: relative;
  user-select: none;
  /* cannot give overflow: hidden as it will crop tooltips which overflow outside chart area */
}


/* scrollbar is not visible by default for legend, hence forcing the visibility */
.apexcharts-canvas ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
}

.apexcharts-canvas ::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}


.apexcharts-inner {
  position: relative;
}

.apexcharts-text tspan {
  font-family: inherit;
}

.legend-mouseover-inactive {
  transition: 0.15s ease all;
  opacity: 0.20;
}

.apexcharts-series-collapsed {
  opacity: 0;
}

.apexcharts-tooltip {
  border-radius: 5px;
  box-shadow: 2px 2px 6px -4px #999;
  cursor: default;
  font-size: 14px;
  left: 62px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  z-index: 12;
  transition: 0.15s ease all;
}

.apexcharts-tooltip.apexcharts-active {
  opacity: 1;
  transition: 0.15s ease all;
}

.apexcharts-tooltip.apexcharts-theme-light {
  border: 1px solid #e3e3e3;
  background: rgba(255, 255, 255, 0.96);
}

.apexcharts-tooltip.apexcharts-theme-dark {
  color: #fff;
  background: rgba(30, 30, 30, 0.8);
}

.apexcharts-tooltip * {
  font-family: inherit;
}


.apexcharts-tooltip-title {
  padding: 6px;
  font-size: 15px;
  margin-bottom: 4px;
}

.apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
  background: #ECEFF1;
  border-bottom: 1px solid #ddd;
}

.apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title {
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid #333;
}

.apexcharts-tooltip-text-y-value,
.apexcharts-tooltip-text-goals-value,
.apexcharts-tooltip-text-z-value {
  display: inline-block;
  font-weight: 600;
  margin-left: 5px;
}

.apexcharts-tooltip-title:empty,
.apexcharts-tooltip-text-y-label:empty,
.apexcharts-tooltip-text-y-value:empty,
.apexcharts-tooltip-text-goals-label:empty,
.apexcharts-tooltip-text-goals-value:empty,
.apexcharts-tooltip-text-z-value:empty {
  display: none;
}

.apexcharts-tooltip-text-y-value,
.apexcharts-tooltip-text-goals-value,
.apexcharts-tooltip-text-z-value {
  font-weight: 600;
}

.apexcharts-tooltip-text-goals-label, 
.apexcharts-tooltip-text-goals-value {
  padding: 6px 0 5px;
}

.apexcharts-tooltip-goals-group, 
.apexcharts-tooltip-text-goals-label, 
.apexcharts-tooltip-text-goals-value {
  display: flex;
}
.apexcharts-tooltip-text-goals-label:not(:empty),
.apexcharts-tooltip-text-goals-value:not(:empty) {
  margin-top: -6px;
}

.apexcharts-tooltip-marker {
  width: 12px;
  height: 12px;
  position: relative;
  top: 0px;
  margin-right: 10px;
  border-radius: 50%;
}

.apexcharts-tooltip-series-group {
  padding: 0 10px;
  display: none;
  text-align: left;
  justify-content: left;
  align-items: center;
}

.apexcharts-tooltip-series-group.apexcharts-active .apexcharts-tooltip-marker {
  opacity: 1;
}

.apexcharts-tooltip-series-group.apexcharts-active,
.apexcharts-tooltip-series-group:last-child {
  padding-bottom: 4px;
}

.apexcharts-tooltip-series-group-hidden {
  opacity: 0;
  height: 0;
  line-height: 0;
  padding: 0 !important;
}

.apexcharts-tooltip-y-group {
  padding: 6px 0 5px;
}

.apexcharts-tooltip-box, .apexcharts-custom-tooltip {
  padding: 4px 8px;
}

.apexcharts-tooltip-boxPlot {
  display: flex;
  flex-direction: column-reverse;
}

.apexcharts-tooltip-box>div {
  margin: 4px 0;
}

.apexcharts-tooltip-box span.value {
  font-weight: bold;
}

.apexcharts-tooltip-rangebar {
  padding: 5px 8px;
}

.apexcharts-tooltip-rangebar .category {
  font-weight: 600;
  color: #777;
}

.apexcharts-tooltip-rangebar .series-name {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.apexcharts-xaxistooltip {
  opacity: 0;
  padding: 9px 10px;
  pointer-events: none;
  color: #373d3f;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
  background: #ECEFF1;
  border: 1px solid #90A4AE;
  transition: 0.15s ease all;
}

.apexcharts-xaxistooltip.apexcharts-theme-dark {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #fff;
}

.apexcharts-xaxistooltip:after,
.apexcharts-xaxistooltip:before {
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.apexcharts-xaxistooltip:after {
  border-color: rgba(236, 239, 241, 0);
  border-width: 6px;
  margin-left: -6px;
}

.apexcharts-xaxistooltip:before {
  border-color: rgba(144, 164, 174, 0);
  border-width: 7px;
  margin-left: -7px;
}

.apexcharts-xaxistooltip-bottom:after,
.apexcharts-xaxistooltip-bottom:before {
  bottom: 100%;
}

.apexcharts-xaxistooltip-top:after,
.apexcharts-xaxistooltip-top:before {
  top: 100%;
}

.apexcharts-xaxistooltip-bottom:after {
  border-bottom-color: #ECEFF1;
}

.apexcharts-xaxistooltip-bottom:before {
  border-bottom-color: #90A4AE;
}

.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:after {
  border-bottom-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:before {
  border-bottom-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-xaxistooltip-top:after {
  border-top-color: #ECEFF1
}

.apexcharts-xaxistooltip-top:before {
  border-top-color: #90A4AE;
}

.apexcharts-xaxistooltip-top.apexcharts-theme-dark:after {
  border-top-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-xaxistooltip-top.apexcharts-theme-dark:before {
  border-top-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-xaxistooltip.apexcharts-active {
  opacity: 1;
  transition: 0.15s ease all;
}

.apexcharts-yaxistooltip {
  opacity: 0;
  padding: 4px 10px;
  pointer-events: none;
  color: #373d3f;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
  background: #ECEFF1;
  border: 1px solid #90A4AE;
}

.apexcharts-yaxistooltip.apexcharts-theme-dark {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #fff;
}

.apexcharts-yaxistooltip:after,
.apexcharts-yaxistooltip:before {
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.apexcharts-yaxistooltip:after {
  border-color: rgba(236, 239, 241, 0);
  border-width: 6px;
  margin-top: -6px;
}

.apexcharts-yaxistooltip:before {
  border-color: rgba(144, 164, 174, 0);
  border-width: 7px;
  margin-top: -7px;
}

.apexcharts-yaxistooltip-left:after,
.apexcharts-yaxistooltip-left:before {
  left: 100%;
}

.apexcharts-yaxistooltip-right:after,
.apexcharts-yaxistooltip-right:before {
  right: 100%;
}

.apexcharts-yaxistooltip-left:after {
  border-left-color: #ECEFF1;
}

.apexcharts-yaxistooltip-left:before {
  border-left-color: #90A4AE;
}

.apexcharts-yaxistooltip-left.apexcharts-theme-dark:after {
  border-left-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-yaxistooltip-left.apexcharts-theme-dark:before {
  border-left-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-yaxistooltip-right:after {
  border-right-color: #ECEFF1;
}

.apexcharts-yaxistooltip-right:before {
  border-right-color: #90A4AE;
}

.apexcharts-yaxistooltip-right.apexcharts-theme-dark:after {
  border-right-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-yaxistooltip-right.apexcharts-theme-dark:before {
  border-right-color: rgba(0, 0, 0, 0.5);
}

.apexcharts-yaxistooltip.apexcharts-active {
  opacity: 1;
}

.apexcharts-yaxistooltip-hidden {
  display: none;
}

.apexcharts-xcrosshairs,
.apexcharts-ycrosshairs {
  pointer-events: none;
  opacity: 0;
  transition: 0.15s ease all;
}

.apexcharts-xcrosshairs.apexcharts-active,
.apexcharts-ycrosshairs.apexcharts-active {
  opacity: 1;
  transition: 0.15s ease all;
}

.apexcharts-ycrosshairs-hidden {
  opacity: 0;
}

.apexcharts-selection-rect {
  cursor: move;
}

.svg_select_boundingRect, .svg_select_points_rot {
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}
.apexcharts-selection-rect + g .svg_select_boundingRect,
.apexcharts-selection-rect + g .svg_select_points_rot {
  opacity: 0;
  visibility: hidden;
}

.apexcharts-selection-rect + g .svg_select_points_l,
.apexcharts-selection-rect + g .svg_select_points_r {
  cursor: ew-resize;
  opacity: 1;
  visibility: visible;
}

.svg_select_points {
  fill: #efefef;
  stroke: #333;
  rx: 2;
}

.apexcharts-svg.apexcharts-zoomable.hovering-zoom {
  cursor: crosshair
}

.apexcharts-svg.apexcharts-zoomable.hovering-pan {
  cursor: move
}

.apexcharts-zoom-icon,
.apexcharts-zoomin-icon,
.apexcharts-zoomout-icon,
.apexcharts-reset-icon,
.apexcharts-pan-icon,
.apexcharts-selection-icon,
.apexcharts-menu-icon,
.apexcharts-toolbar-custom-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  line-height: 24px;
  color: #6E8192;
  text-align: center;
}

.apexcharts-zoom-icon svg,
.apexcharts-zoomin-icon svg,
.apexcharts-zoomout-icon svg,
.apexcharts-reset-icon svg,
.apexcharts-menu-icon svg {
  fill: #6E8192;
}

.apexcharts-selection-icon svg {
  fill: #444;
  transform: scale(0.76)
}

.apexcharts-theme-dark .apexcharts-zoom-icon svg,
.apexcharts-theme-dark .apexcharts-zoomin-icon svg,
.apexcharts-theme-dark .apexcharts-zoomout-icon svg,
.apexcharts-theme-dark .apexcharts-reset-icon svg,
.apexcharts-theme-dark .apexcharts-pan-icon svg,
.apexcharts-theme-dark .apexcharts-selection-icon svg,
.apexcharts-theme-dark .apexcharts-menu-icon svg,
.apexcharts-theme-dark .apexcharts-toolbar-custom-icon svg {
  fill: #f3f4f5;
}

.apexcharts-canvas .apexcharts-zoom-icon.apexcharts-selected svg,
.apexcharts-canvas .apexcharts-selection-icon.apexcharts-selected svg,
.apexcharts-canvas .apexcharts-reset-zoom-icon.apexcharts-selected svg {
  fill: #008FFB;
}

.apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg,
.apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg,
.apexcharts-theme-light .apexcharts-zoomin-icon:hover svg,
.apexcharts-theme-light .apexcharts-zoomout-icon:hover svg,
.apexcharts-theme-light .apexcharts-reset-icon:hover svg,
.apexcharts-theme-light .apexcharts-menu-icon:hover svg {
  fill: #333;
}

.apexcharts-selection-icon,
.apexcharts-menu-icon {
  position: relative;
}

.apexcharts-reset-icon {
  margin-left: 5px;
}

.apexcharts-zoom-icon,
.apexcharts-reset-icon,
.apexcharts-menu-icon {
  transform: scale(0.85);
}

.apexcharts-zoomin-icon,
.apexcharts-zoomout-icon {
  transform: scale(0.7)
}

.apexcharts-zoomout-icon {
  margin-right: 3px;
}

.apexcharts-pan-icon {
  transform: scale(0.62);
  position: relative;
  left: 1px;
  top: 0px;
}

.apexcharts-pan-icon svg {
  fill: #fff;
  stroke: #6E8192;
  stroke-width: 2;
}

.apexcharts-pan-icon.apexcharts-selected svg {
  stroke: #008FFB;
}

.apexcharts-pan-icon:not(.apexcharts-selected):hover svg {
  stroke: #333;
}

.apexcharts-toolbar {
  position: absolute;
  z-index: 11;
  max-width: 176px;
  text-align: right;
  border-radius: 3px;
  padding: 0px 6px 2px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.apexcharts-menu {
  background: #fff;
  position: absolute;
  top: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 3px;
  right: 10px;
  opacity: 0;
  min-width: 110px;
  transition: 0.15s ease all;
  pointer-events: none;
}

.apexcharts-menu.apexcharts-menu-open {
  opacity: 1;
  pointer-events: all;
  transition: 0.15s ease all;
}

.apexcharts-menu-item {
  padding: 6px 7px;
  font-size: 12px;
  cursor: pointer;
}

.apexcharts-theme-light .apexcharts-menu-item:hover {
  background: #eee;
}

.apexcharts-theme-dark .apexcharts-menu {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

@media screen and (min-width: 768px) {
  .apexcharts-canvas:hover .apexcharts-toolbar {
    opacity: 1;
  }
}

.apexcharts-datalabel.apexcharts-element-hidden {
  opacity: 0;
}

.apexcharts-pie-label,
.apexcharts-datalabels,
.apexcharts-datalabel,
.apexcharts-datalabel-label,
.apexcharts-datalabel-value {
  cursor: default;
  pointer-events: none;
}

.apexcharts-pie-label-delay {
  opacity: 0;
  animation-name: opaque;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.apexcharts-canvas .apexcharts-element-hidden {
  opacity: 0;
}

.apexcharts-hide .apexcharts-series-points {
  opacity: 0;
}

.apexcharts-gridline,
.apexcharts-annotation-rect,
.apexcharts-tooltip .apexcharts-marker,
.apexcharts-area-series .apexcharts-area,
.apexcharts-line,
.apexcharts-zoom-rect,
.apexcharts-toolbar svg,
.apexcharts-area-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,
.apexcharts-line-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,
.apexcharts-radar-series path,
.apexcharts-radar-series polygon {
  pointer-events: none;
}


/* markers */

.apexcharts-marker {
  transition: 0.15s ease all;
}

@keyframes opaque {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


/* Resize generated styles */

@keyframes resizeanim {
  from {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
}

.resize-triggers {
  animation: 1ms resizeanim;
  visibility: hidden;
  opacity: 0;
}

.resize-triggers,
.resize-triggers>div,
.contract-trigger:before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.resize-triggers>div {
  background: #eee;
  overflow: auto;
}

.contract-trigger:before {
  width: 200%;
  height: 200%;
}</style></head>
<body>
<nav class="top-nav">
    <ul class="nav_items">
        <li class="logo"><a href="http://localhost/fatigue-diary/src/index.php?page=app"><img src="Dashboard-Dateien/logo.svg" alt=""></a></li>
        <div class="icons">
            <li><a href="http://localhost/fatigue-diary/src/index.php?page=settings"><span class="material-icons">settings</span></a></li>
            <li><a href="javascript:void(0)" class="menu-tour"><span class="material-icons" id="open">menu</span></a> <a href="javascript:void(0)" onclick="closeNav()"><span class="material-icons" id="close">close</span></a></li>
        </div>
    </ul>
</nav>


<div class="sidenav" id="mySidenav">
    <ul>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=profile">Profil</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=appe">Fatigue Diary</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=about-app">Über</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=new">Was ist neu?</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=contact">Kontakt</a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=logout" class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
    </ul>
</div>

<script>
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("open").style.display = "none";
  document.getElementById("close").style.display = "inline";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("open").style.display = "inline";
    document.getElementById("close").style.display = "none";
}
</script><nav class="bottom-nav">
    <ul class="nav_items">
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=dashboard"><span class="material-icons">bar_chart</span></a></li>
        <li><a class="add"><span class="material-icons">add</span></a></li>
        <li><a href="http://localhost/fatigue-diary/src/index.php?page=entries"><span class="material-icons">assignment</span></a></li>
    </ul>
</nav><script type="text/javascript" src="Dashboard-Dateien/toastify.js"></script>

    <div class="welcome-text">
        <h6>Hi Max Mustermann</h6>
        <h3>Dein Dashboard</h3>
    </div>
    <div class="date-tour">
      <div class="date-range">
          <p id="range_d" class="range-item active">Tag</p>
          <p id="range_w" class="range-item">Woche</p>
          <p id="range_m" class="range-item">Monat</p>
          <p id="range_y" class="range-item">Jahr</p>
      </div>
      <div class="date-picker">
          <span class="material-icons" id="nextDay">chevron_left</span>
          <input id="dateInput" type="date" class="date" value="2022-07-13">
          <span class="material-icons" id="prevDay">chevron_right</span>
      </div>
    </div>
    
    <div class="container chart">
        <h3 class="center-title">Energie</h3>
        <div id="energylevel_area" style="min-height: 265px;"><div id="apexchartsbj3re0d7g" class="apexcharts-canvas apexchartsbj3re0d7g apexcharts-theme-light" style="width: 342px; height: 250px;"><svg id="SvgjsSvg1272" width="342" height="250" xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.dev" class="apexcharts-svg apexcharts-zoomable" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent none repeat scroll 0% 0%;"><g id="SvgjsG1274" class="apexcharts-inner apexcharts-graphical" transform="translate(55.54998779296875, 30)"><defs id="SvgjsDefs1273"><clipPath id="gridRectMaskbj3re0d7g"><rect id="SvgjsRect1281" width="284.45001220703125" height="189.8" x="-4" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMaskbj3re0d7g"></clipPath><clipPath id="nonForecastMaskbj3re0d7g"></clipPath><clipPath id="gridRectMarkerMaskbj3re0d7g"><rect id="SvgjsRect1282" width="280.45001220703125" height="189.8" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><linearGradient id="SvgjsLinearGradient1287" x1="0" y1="0" x2="0" y2="1"><stop id="SvgjsStop1288" stop-opacity="0.65" stop-color="rgba(245,91,83,0.65)" offset="0"></stop><stop id="SvgjsStop1289" stop-opacity="0.5" stop-color="rgba(250,173,169,0.5)" offset="1"></stop><stop id="SvgjsStop1290" stop-opacity="0.5" stop-color="rgba(250,173,169,0.5)" offset="1"></stop></linearGradient></defs><line id="SvgjsLine1280" x1="0" y1="0" x2="0" y2="185.8" stroke="#b6b6b6" stroke-dasharray="3" stroke-linecap="butt" class="apexcharts-xcrosshairs" x="0" y="0" width="1" height="185.8" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><g id="SvgjsG1293" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1294" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"><text id="SvgjsText1296" font-family="Helvetica, Arial, sans-serif" x="0" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1297">06:00</tspan><title>06:00</title></text><text id="SvgjsText1299" font-family="Helvetica, Arial, sans-serif" x="55.29000244140626" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1300">09:24</tspan><title>09:24</title></text><text id="SvgjsText1302" font-family="Helvetica, Arial, sans-serif" x="110.5800048828125" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1303">12:48</tspan><title>12:48</title></text><text id="SvgjsText1305" font-family="Helvetica, Arial, sans-serif" x="165.87000732421873" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1306">16:12</tspan><title>16:12</title></text><text id="SvgjsText1308" font-family="Helvetica, Arial, sans-serif" x="221.16000976562498" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1309">19:36</tspan><title>19:36</title></text><text id="SvgjsText1311" font-family="Helvetica, Arial, sans-serif" x="276.45001220703125" y="214.8" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-xaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1312"></tspan><title></title></text></g><line id="SvgjsLine1313" x1="0" y1="186.8" x2="276.45001220703125" y2="186.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"></line></g><g id="SvgjsG1334" class="apexcharts-grid"><g id="SvgjsG1335" class="apexcharts-gridlines-horizontal"><line id="SvgjsLine1343" x1="0" y1="0" x2="276.45001220703125" y2="0" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1344" x1="0" y1="37.160000000000004" x2="276.45001220703125" y2="37.160000000000004" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1345" x1="0" y1="74.32000000000001" x2="276.45001220703125" y2="74.32000000000001" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1346" x1="0" y1="111.48000000000002" x2="276.45001220703125" y2="111.48000000000002" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1347" x1="0" y1="148.64000000000001" x2="276.45001220703125" y2="148.64000000000001" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1348" x1="0" y1="185.8" x2="276.45001220703125" y2="185.8" stroke="#7d8082" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line></g><g id="SvgjsG1336" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine1337" x1="0" y1="186.8" x2="0" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1338" x1="55.29000244140625" y1="186.8" x2="55.29000244140625" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1339" x1="110.5800048828125" y1="186.8" x2="110.5800048828125" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1340" x1="165.87000732421876" y1="186.8" x2="165.87000732421876" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1341" x1="221.160009765625" y1="186.8" x2="221.160009765625" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1342" x1="276.45001220703125" y1="186.8" x2="276.45001220703125" y2="192.8" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine1350" x1="0" y1="185.8" x2="276.45001220703125" y2="185.8" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine1349" x1="0" y1="1" x2="0" y2="185.8" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g><g id="SvgjsG1283" class="apexcharts-area-series apexcharts-plot-series"><g id="SvgjsG1284" class="apexcharts-series" seriesName="Energie" data:longestSeries="true" rel="1" data:realIndex="0"><path id="SvgjsPath1291" d="M 8.130882711971507 185.8L 8.130882711971507 37.16C 13.822500610351563 37.16 18.701030237534468 55.74000000000001 24.392648135914524 55.74000000000001C 43.36470779718137 55.74000000000001 59.62647322112439 102.19 78.59853288239124 102.19C 79.83171676037358 102.19 80.88873151292988 74.32 82.12191539091222 74.32C 86.10604791977826 74.32 89.5210186588063 120.77000000000001 93.50515118767234 120.77000000000001C 106.78559295055913 120.77000000000001 118.16882874731925 120.77000000000001 131.44927051020605 120.77000000000001C 131.44927051020605 120.77000000000001 131.44927051020605 120.77000000000001 131.44927051020605 185.8M 131.44927051020605 120.77000000000001z" fill="url(#SvgjsLinearGradient1287)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMaskbj3re0d7g)" pathTo="M 8.130882711971507 185.8L 8.130882711971507 37.16C 13.822500610351563 37.16 18.701030237534468 55.74000000000001 24.392648135914524 55.74000000000001C 43.36470779718137 55.74000000000001 59.62647322112439 102.19 78.59853288239124 102.19C 79.83171676037358 102.19 80.88873151292988 74.32 82.12191539091222 74.32C 86.10604791977826 74.32 89.5210186588063 120.77000000000001 93.50515118767234 120.77000000000001C 106.78559295055913 120.77000000000001 118.16882874731925 120.77000000000001 131.44927051020605 120.77000000000001C 131.44927051020605 120.77000000000001 131.44927051020605 120.77000000000001 131.44927051020605 185.8M 131.44927051020605 120.77000000000001z" pathFrom="M -1 185.8L -1 185.8L 24.392648135914524 185.8L 78.59853288239124 185.8L 82.12191539091222 185.8L 93.50515118767234 185.8L 131.44927051020605 185.8"></path><path id="SvgjsPath1292" d="M 8.130882711971507 37.16C 13.822500610351563 37.16 18.701030237534468 55.74000000000001 24.392648135914524 55.74000000000001C 43.36470779718137 55.74000000000001 59.62647322112439 102.19 78.59853288239124 102.19C 79.83171676037358 102.19 80.88873151292988 74.32 82.12191539091222 74.32C 86.10604791977826 74.32 89.5210186588063 120.77000000000001 93.50515118767234 120.77000000000001C 106.78559295055913 120.77000000000001 118.16882874731925 120.77000000000001 131.44927051020605 120.77000000000001" fill="none" fill-opacity="1" stroke="#f55b53" stroke-opacity="1" stroke-linecap="butt" stroke-width="4" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMaskbj3re0d7g)" pathTo="M 8.130882711971507 37.16C 13.822500610351563 37.16 18.701030237534468 55.74000000000001 24.392648135914524 55.74000000000001C 43.36470779718137 55.74000000000001 59.62647322112439 102.19 78.59853288239124 102.19C 79.83171676037358 102.19 80.88873151292988 74.32 82.12191539091222 74.32C 86.10604791977826 74.32 89.5210186588063 120.77000000000001 93.50515118767234 120.77000000000001C 106.78559295055913 120.77000000000001 118.16882874731925 120.77000000000001 131.44927051020605 120.77000000000001" pathFrom="M -1 185.8L -1 185.8L 24.392648135914524 185.8L 78.59853288239124 185.8L 82.12191539091222 185.8L 93.50515118767234 185.8L 131.44927051020605 185.8"></path><g id="SvgjsG1285" class="apexcharts-series-markers-wrap" data:realIndex="0"><g class="apexcharts-series-markers"><circle id="SvgjsCircle1356" r="0" cx="0" cy="0" class="apexcharts-marker wn5hjyus7 no-pointer-events" stroke="#ffffff" fill="#f55b53" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" default-marker-size="0"></circle></g></g></g><g id="SvgjsG1286" class="apexcharts-datalabels" data:realIndex="0"></g></g><line id="SvgjsLine1351" x1="0" y1="0" x2="276.45001220703125" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1352" x1="0" y1="0" x2="276.45001220703125" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1353" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1354" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1355" class="apexcharts-point-annotations"></g><rect id="SvgjsRect1357" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-zoom-rect"></rect><rect id="SvgjsRect1358" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-selection-rect"></rect></g><rect id="SvgjsRect1279" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect><g id="SvgjsG1314" class="apexcharts-yaxis" rel="0" transform="translate(25.54998779296875, 0)"><g id="SvgjsG1315" class="apexcharts-yaxis-texts-g"><text id="SvgjsText1317" font-family="Helvetica, Arial, sans-serif" x="20" y="31.5" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1318">10.0</tspan><title>10.0</title></text><text id="SvgjsText1320" font-family="Helvetica, Arial, sans-serif" x="20" y="68.66" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1321">8.0</tspan><title>8.0</title></text><text id="SvgjsText1323" font-family="Helvetica, Arial, sans-serif" x="20" y="105.82" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1324">6.0</tspan><title>6.0</title></text><text id="SvgjsText1326" font-family="Helvetica, Arial, sans-serif" x="20" y="142.98" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1327">4.0</tspan><title>4.0</title></text><text id="SvgjsText1329" font-family="Helvetica, Arial, sans-serif" x="20" y="180.14" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1330">2.0</tspan><title>2.0</title></text><text id="SvgjsText1332" font-family="Helvetica, Arial, sans-serif" x="20" y="217.29999999999998" text-anchor="end" dominant-baseline="auto" font-size="11px" font-weight="400" fill="#7d8082" class="apexcharts-text apexcharts-yaxis-label " style="font-family: Helvetica, Arial, sans-serif;"><tspan id="SvgjsTspan1333">0.0</tspan><title>0.0</title></text></g></g><g id="SvgjsG1275" class="apexcharts-annotations"></g></svg><div class="apexcharts-legend" style="max-height: 125px;"></div><div class="apexcharts-tooltip apexcharts-theme-light"><div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div><div class="apexcharts-tooltip-series-group" style="order: 1;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(245, 91, 83);"></span><div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light"><div class="apexcharts-xaxistooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div class="apexcharts-yaxistooltip-text"></div></div><div class="apexcharts-toolbar" style="top: 0px; right: 3px;"><div class="apexcharts-zoomin-icon" title="Zoom In"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
</svg>
</div><div class="apexcharts-zoomout-icon" title="Zoom Out"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
</svg>
</div><div class="apexcharts-element-hidden apexcharts-selected" title="Selection Zoom"><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path>
</svg></div><div class="apexcharts-element-hidden" title="Panning"><svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
    <defs>
        <path d="M0 0h24v24H0z" id="a"></path>
    </defs>
    <clipPath id="b">
        <use overflow="visible" xlink:href="#a"></use>
    </clipPath>
    <path clip-path="url(#b)" d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path>
</svg></div><div class="apexcharts-reset-icon" title="Reset Zoom"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
    <path d="M0 0h24v24H0z" fill="none"></path>
</svg></div><div class="apexcharts-menu-icon" title="Menu"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></div><div class="apexcharts-menu"><div class="apexcharts-menu-item exportSVG" title="Download SVG">Download SVG</div><div class="apexcharts-menu-item exportPNG" title="Download PNG">Download PNG</div><div class="apexcharts-menu-item exportCSV" title="Download CSV">Download CSV</div></div></div></div></div>
        <!-- <div class="point-amount">
            <button class="btn-primary" type="" name="">Alle Werte</button>
            <button class="btn-primary outline" type="" name="">Tages Druchschn.</button>
            <button class="btn-primary outline" type="" name="">Wochen Druchschn.</button>
        </div> -->
    </div>
    
    
    <div class="container good-activities-tour">
        <h3 class="center-title">Aktivitäten, die dir Energie geben.</h3>
        <div class="rated-activities">
        <p class="rated-activity border_color" style="border-color: rgb(105, 164, 85);">Schlafen</p><p class="rated-activity border_color" style="border-color: rgb(164, 190, 109);">Ausruhen</p><p class="rated-activity border_color" style="border-color: rgb(249, 196, 70);">Duschen</p>        </div>
    </div>
    <div class="container bad-activities-tour">
        <h3 class="center-title">Aktivitäten, die dir Energie rauben.</h3>
        <div class="rated-activities">
            <p class="rated-activity border_color" style="border-color: rgb(232, 142, 130);">Arbeiten</p><p class="rated-activity border_color" style="border-color: rgb(243, 114, 44);">Therapie</p>        </div>
    </div>
    
    
    
    <script src="Dashboard-Dateien/moment.min.js"></script>
    <script src="Dashboard-Dateien/apexcharts"></script>
    <script src="Dashboard-Dateien/visualizeValue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/shepherd.js@8.3.1/dist/js/shepherd.min.js"></script>

    <script>
        var border = document.getElementsByClassName("border_color");
        calculateBorderColor(10, border[0]); 
calculateBorderColor(7.5, border[1]); 
calculateBorderColor(7, border[2]); 
calculateBorderColor(2.5, border[3]); 
calculateBorderColor(4, border[4]); 


    var range = 0;
    updateChart();

    // document.getElementById("range_d").addEventListener("click", function () { range = 0; changeDateRange(range); });
    // document.getElementById("range_w").addEventListener("click", function () { range = 1; changeDateRange(range); });
    // document.getElementById("range_m").addEventListener("click", function () { range = 2; changeDateRange(range); });
    // document.getElementById("range_y").addEventListener("click", function () { range = 3; changeDateRange(range); });

    function changeDateRange(index) {
        range_type = ["range_d", "range_w", "range_m", "range_y"];
        for (var i = 0; i < range_type.length; i++) {
            if (i == index) {
                document.getElementById(range_type[i]).classList.add("active");
            }
            else {
                document.getElementById(range_type[i]).classList.remove("active");
            }
        }
        if (range >= 1) {
            document.getElementById("energylevel_area").innerHTML = "<p>Diese Ansicht kommt bald...</p>";
        } else {
            updateChart();
        }
    }
    

    document.getElementById("nextDay").addEventListener("click", function () { changeDate(-1); });
    document.getElementById("prevDay").addEventListener("click", function () { changeDate(1); });
    var dateInput = document.getElementById("dateInput");
    dateInput.addEventListener("change", function () { changeDate(0); });
    var date = new Date();

    function changeDate(change) {
        date = new Date(dateInput.value);
        newDate = date.setDate(date.getDate() + change); // add one day
        newDate = moment(newDate).format("YYYY-MM-DD");
        dateInput.value = newDate;
        date = newDate;
        updateChart();
    }

    function updateChart() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                eval(this.responseText);
            }
        };
        xmlhttp.open("GET", "index.php?page=ajax&chart=" + range + "&date=" + moment(date).format("YYYY-MM-DD"), true);
        xmlhttp.send();
    }
    </script>

  <script>
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-md bg-purple-dark',
            scrollTo: true
        }
    });

    <?php if (!isset($_GET['intro'])) : ?>
      tour.addStep({
          text: 'Dies ist ein Tutorial für Fatigue Diary. <br> Willkommen zu deinem Dashboard.',
          attachTo: {
              on: 'center'
          },
          buttons: [
              {
                  text: 'Tour überspringen',
                  action: function () {
                    window.location.href = '../../../index.php';
                  }
              },
              {
                text: 'Weiter',
                action: tour.next
              }
          ]
      });
      
      tour.addStep({
        text: 'Mit einem Klick auf das Plus-Icon fügst du einen Eintrag hinzu. Füge wenn möglich nach jeder Aktivität einen eigenen Eintrag hinzu.',
        attachTo: {
            element: '.add',
            on: 'top'
        },
        buttons: [
          {
            text: 'Weiter',
            action: function () {
              window.location.href = 'addnew.php';
            }
          }
        ]
      });
    
    <?php else: ?>
      tour.addStep({
          text: 'Hier siehst du deinen Tagesverlauf.',
          attachTo: {
              element: '.container.chart',
              on: 'top'
          },
          buttons: [
              {
                text: 'Weiter',
                action: tour.next
              }
          ]
      });
      
      tour.addStep({
        text: 'Du kannst auch den dargestellten Bereich und das Datum ändern.',
        attachTo: {
            element: '.date-tour',
            on: 'top'
        },
        buttons: [
          {
            text: 'Weiter',
            action: tour.next
          }
        ]
      });
      tour.addStep({
        text: 'Hier werden Aktivitäten berechnet, die dir Energie geben.',
        attachTo: {
            element: '.good-activities-tour',
            on: 'top'
        },
        buttons: [
          {
            text: 'Weiter',
            action: tour.next
          }
        ]
      });
      tour.addStep({
        text: 'Hier werden Aktivitäten berechnet, die dir Energie rauben. Beachte aber, dass nur die kurzfristige Änderung und nicht der langfristige Einfluss einer Aktivität miteinbezogen wird.',
        attachTo: {
            element: '.bad-activities-tour',
            on: 'top'
        },
        buttons: [
          {
            text: 'Weiter',
            action: tour.next
          }
        ]
      });

      tour.addStep({
        text: 'Im Menu findet du noch weitere Informationen und Einstellungsmöglichkeiten zur App.',
        attachTo: {
            element: '.menu-tour',
            on: 'top'
        },
        buttons: [
          {
            text: 'Weiter',
            action: tour.next
          }
        ]
      });

      tour.addStep({
        text: 'Dies waren Beispiel-Daten, nun bringe ich dich zu deinem eigenen Dashboard.',
        attachTo: {
            on: 'center'
        },
        buttons: [
          {
            text: 'Tour beenden',
            action: function () {
              window.location.href = '../../../index.php';
            }
          }
        ]
      });
    <?php endif; ?>
  

    tour.start();
  </script>


<svg id="SvgjsSvg1001" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.dev" style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;"><defs id="SvgjsDefs1002"></defs><polyline id="SvgjsPolyline1003" points="0,0"></polyline><path id="SvgjsPath1004" d="M-1 185.8L-1 185.8C-1 185.8 24.392648135914524 185.8 24.392648135914524 185.8C24.392648135914524 185.8 78.59853288239124 185.8 78.59853288239124 185.8C78.59853288239124 185.8 82.12191539091222 185.8 82.12191539091222 185.8C82.12191539091222 185.8 93.50515118767234 185.8 93.50515118767234 185.8C93.50515118767234 185.8 131.44927051020605 185.8 131.44927051020605 185.8C131.44927051020605 185.8 131.44927051020605 185.8 131.44927051020605 185.8 "></path></svg></body></html>