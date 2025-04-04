<?php

/**
 * URI TUITION CALCULATOR - PELL GRANT DISPLAY TEMPLATE 
 *
 * @package uri-tuition-calculator
 */

?>
<script src="https://unpkg.com/papaparse@latest/papaparse.min.js"></script>

<div class="uri-tuition-calculator-pell-grant" id="pell-grant-calc">
	<h2 class="tuition-calc-header"><?php print $attributes['title']; ?></h2>

	<div class="form-content">
		<!--SELECT AWARD AMOUNT-->
		<div class="award-amount">
			<label for="pell-amount" id="award-amount">Federal Pell Grant Award for the Spring <?php print $attributes['semester']?> semester</label><br>
			<select id="p-award">
			<option selected value="disabled">Select Amount</option>
			</select>
		</div><!--END AWARD AMOUNT-->

		<!--Number of Credit Selection-->
		<div class="credit-amount">
			<label for="credit-amount" id="credit-amount">Number of Spring <?php print $attributes['semester']?> semester credits</label><br>
			<select id="c-amount">
			<option selected value="disabled">Select Amount</option>
			</select>
		</div><!--END CREDIT AMOUNT-->


		<!--SELECT RESIDENCY STATUS-->
		<label for="resi" id="residency">Residency</label><br>
		<select id="resi">
			<option selected value="disabled">Select Residency
			</option>
			<option value="instate">In State</option>
			<option value="regional">Regional</option>
			<option value="out-of-state">Out of State</option>
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
		</div> <!--End form content-->

		<!--BUTTONS-->
		<div id="buttons">

			<input type="button" id="calc" value="Calculate Cost">

			<input type="button" id="reload" value="Reset Calculator">
		</div>
		<!--END BUTTONS-->


		<!--CALC CONTENT-->
<div class="calculations">
   <p class="yourCourses"></p>

   <p id="instateTuition"></p>
   <p id="regionalTuition"></p>
   <p id="out-of-state"></p>
   <p id="course-fee"></p>
   <p id="techFee"></p>
   <p id="registration-fee"></p>
   <p id="summer-credit-total"></p>
   <p id="max-award"></p>
    

   <br>
   <p id="tuition-total"></p>
   <p id="summer-award"></p>
   <p id="new-total"></p>
   

</div><!--END CALC CONTENT-->


	</div><!--END TUITION CALCULATOR-->