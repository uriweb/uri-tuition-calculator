# URI Tuition Calculator

The URI Tuition Calculator brings in tuition and fee data for courses via a Google spreadsheet and calculates an estimated cost.

## Shortcode Parameters 

### calc_name
default: null \
choose either: "summer", "jterm", or "pellgrant" \
ex: `[tuition-calculator calc_name="summer"]`

### title 
default: "Tuition and Fees Calculator" \
(Heading level 2) \
ex: `[tuition-calculator calc_name="jterm" title="Estimated Winter J Term Tuition and Fees Calculator"]`

### spreadsheet
defualt: null \
url of the spreadsheet \
ex: `[tuition-calculator calc_name="summer" spreadsheet="https://docs.google.com/spreadsheets/d/[spreadsheetID]/gviz/tq?tqx=out:csv&sheet=[SheetName]"]`

### semester 
default: null \
specify the semester year (appears in text in pellgrant calculator)\
ex: `[tuition-calculator calc_name="summer" spreadsheet="https://docs.google.com/spreadsheets/d/[spreadsheetID]/gviz/tq?tqx=out:csv&sheet=[SheetName]" semester="2025"]`



## Plugin Details

[![Master Build Status](https://travis-ci.com/uriweb/uri-plugin-template.svg?branch=master "Master build status")](https://travis-ci.com/uriweb/uri-plugin-template)
[![CodeFactor](https://www.codefactor.io/repository/github/uriweb/uri-plugin-template/badge/master)](https://www.codefactor.io/repository/github/uriweb/uri-plugin-template/overview/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/77712193bd8643f88fad1fbdc8a02c87)](https://www.codacy.com/app/uriweb/uri-plugin-template?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=uriweb/uri-plugin-template&amp;utm_campaign=Badge_Grade)
[![devDependencies Status](https://david-dm.org/uriweb/uri-plugin-template/dev-status.svg)](https://david-dm.org/uriweb/uri-plugin-template?type=dev)



Contributors: Brandon Fuller, Alexandra Gauss, Sarah Pucino
Tags: plugins  
Requires at least: 4.0  
Tested up to: 5.7  
Stable tag: 1.3.0 
