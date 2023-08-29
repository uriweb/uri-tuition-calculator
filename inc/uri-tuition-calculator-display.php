<?php
/**
 * URI TUITION CALCULATOR DISPLAY TEMPLATE
 *
 * @package uri-tuition-calculator
 */

?>
<script src="https://unpkg.com/papaparse@latest/papaparse.min.js"></script>

 <div class="uri-tuition-calculator">
<h2 class="tuition-calc-header">Tuition and Fees Calculator</h2>

<!--SELECT RESIDENCY STATUS-->
<label id="residency">Residency</label>
   <select id="resi">
	  <option disabled selected value="disabled">--</option>
	  <option value="instate">In State</option>
	  <option value="regional">Regional</option>
	  <option value="out-of-state">Out of State</option>
   </select>

   <!--ADD COURSES-->
   <div class="courses">
   <label id="selectcourses">Select Courses</label><br>
   <div id="courseoption1">
   <select id="courseNumber" name="courseNumber">
   </select>
   <input type="" class="addCourse" value="+ Add another course"/>
</div>

   <div id="courseoption2">
   <select id="courseNumber2" name="courseNumber2"></select>
   <input type="" class="addCourse" value="+ Add another course"/>
</div>

   <div id="courseoption3">
   <select id="courseNumber3" name="courseNumber3"></select>
   <input type="" class="addCourse" value="+ Add another course"/>
</div>

   <div id="courseoption4">
   <select id="courseNumber4" name="courseNumber4"></select>
</div>
</div><!--END ADD COURSES-->

<!--FEE QUETIONS-->
   <div id="q2">
   <input type="checkbox" id="firstclass">This is the first time I am enrolling in classes at URI.
   </div>
   <div id="q3">
   <input type="checkbox" id="matriculating">  I am officially matriculating into URI. <br>
<br>
</div><!--END FEE QUESTIONS-->

<!--BUTTONS-->

<input type="button" id="calc" value ="Calculate Cost">

<input type="button" id="reload" value ="Reset Calculator">

<!--END BUTTONS-->


   <!--CALC CONTENT-->
   <div class="calculations">
   <p class="yourCourses" style="font-weight:bold;"></p>
   <hr id="divide">
   
   <p id="instateTuition"></p>
   <p id="regionalTuition"></p>
   <p id="out-of-state"></p>
   <p id="course-fee"></p>
   <p id="techFee"></p>
   <p id="registration-fee"></p>
   <p id="student-act-fee"></p>
   <p id="transcript-fee"></p>
   <p id="document-fee"></p>
   <br>
   <p id="total" style="font-weight:bold";></p>
</div><!--END CALC CONTENT-->


</div><!--END TUITION CALCULATOR-->




