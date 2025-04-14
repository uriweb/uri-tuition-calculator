<?php

/**
 * URI TUITION CALCULATOR - SUMMER COURSES DISPLAY TEMPLATE 
 *
 * @package uri-tuition-calculator
 */
?>
<script src="https://unpkg.com/papaparse@latest/papaparse.min.js"></script>

<div class="uri-tuition-calculator-summer-courses" id="summer-calc">
   <h2 class="tuition-calc-header"><?php print $attributes['title']; ?></h2>

   <div class="form-content">
	  <!--SELECT RESIDENCY STATUS-->
	  <label for="resi" id="residency">Residency</label><br>
	  <select id="resi">
		 <option selected value="disabled">Select Residency
		 </option>
		 <option value="instate">In-State</option>
		 <option value="regional">Regional</option>
		 <option value="out-of-state">Out-of-State</option>
	  </select>
	  </label>

	  <!--ADD COURSES-->
	  <div class="courses">
		 <fieldset>
			<legend id="selectcourses">Courses</legend>
			<div id="courseoption1">
			   <select id="courseNumber" name="courseNumber" aria-labelledby="selectcourses">
			   </select>
			</div>

			<div id="courseoption2">
			   <select id="courseNumber2" name="courseNumber2" aria-labelledby="selectcourses"></select>
			</div>

			<div id="courseoption3">
			   <select id="courseNumber3" name="courseNumber3" aria-labelledby="selectcourses"></select>
			</div>

			<div id="courseoption4">
			   <select id="courseNumber4" name="courseNumber4" aria-labelledby="selectcourses"></select>
			</div>
		 </fieldset>
		 <input type="button" id="addCourse" value="+ Add another course">
	  </div><!--END ADD COURSES-->

   <!--FEE QUESTIONS-->
   <div id="q2">
	  <input type="checkbox" id="firstclass">
	  <label for="firstclass">This is the first time I am enrolling in classes at URI.</label>
   </div>
   <div id="q3">
	  <input type="checkbox" id="matriculating">
	  <label for="matriculating">I am officially matriculating into URI.</label>
   </div><!--END FEE QUESTIONS-->

   </div> <!--END FORM CONTENT-->

<!--BUTTONS-->
<div id="buttons">

   <input type="button" id="calc" value="Calculate Cost">

   <input type="button" id="reload" value="Reset Calculator">
</div>

<!--END BUTTONS-->


<!--CALC CONTENT-->
<div class="calculations">
   <p class="yourCourses"></p>
   <!--<hr id="divide"> -->

   <p id="instateTuition"></p>
   <p id="regionalTuition"></p>
   <p id="out-of-state"></p>
   <p id="course-fee"></p>
   <p id="techFee"></p>
   <p id="registration-fee"></p>
   <p id="student-act-fee"></p>
   <p id="transcript-fee"></p>
   <p id="document-fee"></p>
   <p id="inclusive-access-fee"></p>
   <br>
   <p id="total" style="font-weight:bold" ;></p>
   <p id="access-note"></p>
</div><!--END CALC CONTENT-->


</div><!--END TUITION CALCULATOR-->
