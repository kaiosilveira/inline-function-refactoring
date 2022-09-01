# Inline function

[![Continuous Integration](https://github.com/kaiosilveira/inline-function-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/inline-function-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my "refactoring" catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

Sometimes a short function's body is as clear as its name (and some other times, the function name is even longer than the one-line implementation of the code). In these cases, inlining the function statement and deleting the function seems natural, as we will often be using language constructs to better express the intent of the code, instead of hiding it behind function calls.

## Working examples

As our working examples, we will have two functions: one that calculates the rating of a driver based on their number of late deliveries, and another one that creates report lines for a given customer. These functions are currently calling one other function each, and we want to inline these calls.

### Working example #1: The getRating function

As described above, the `getRating` function is a simple method that calculates the rating of a given driver. It relies on another function called `moreThanFiveLateDeliveries` to check whether the given driver has more than five late deliveries. We want to remove `moreThanFiveLateDeliveries` and inline it in the body of `getRating`.

#### Before

Initial code for `rating.js`:

```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dvr) {
  return dvr.numberOfLateDeliveries > 5;
}
```

#### After

Final code for `rating.js`:

```javascript
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

#### Test suite

The test suite For `rating.js` include tests to assert that:

- it returns 1 as the rating when the driver has less than 5 deliveries
- it returns 1 as the rating when the driver has exactly 5 deliveries
- it returns 2 as the rating when the driver has more than five deliveries

For implementation details, see [rating.test.js](./rating.test.js).

#### Steps

As we want to inline the statement inside `moreThanFiveLateDeliveries(dvr)`, first we need to rename its parameter so it has the same name as the one being passed down by the caller:

```diff
diff --git a/rating.js b/rating.js
@@ -2,8 +2,8 @@ function getRating(driver) {
   return moreThanFiveLateDeliveries(driver) ? 2 : 1;
 }

-function moreThanFiveLateDeliveries(dvr) {
-  return dvr.numberOfLateDeliveries > 5;
+function moreThanFiveLateDeliveries(driver) {
+  return driver.numberOfLateDeliveries > 5;
 }

 module.exports = { getRating };
```

And then we inline the call to `moreThanFiveLateDeliveries`:

```diff
diff --git a/rating.js b/rating.js
@@ -1,5 +1,5 @@
 function getRating(driver) {
-  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
+  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
 }

 function moreThanFiveLateDeliveries(driver) {
```

And finally, if there are no other references to `moreThanFiveLateDeliveries`, we can safely remove it:

```diff
diff --git a/rating.js b/rating.js
@@ -2,8 +2,4 @@ function getRating(driver) {
   return driver.numberOfLateDeliveries > 5 ? 2 : 1;
 }

-function moreThanFiveLateDeliveries(driver) {
-  return driver.numberOfLateDeliveries > 5;
-}
-
 module.exports = { getRating };
```

#### Commit history

See below a chronology (from top to bottom) of all the refactoring steps:

| Commit SHA                                                                                                             | Message                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [2608e81](https://github.com/kaiosilveira/inline-function-refactoring/commit/2608e8127cf8a45b4b1407b5fef8e4b622ed234b) | rename moreThanFiveLateDeliveries parameter |
| [3fe61cc](https://github.com/kaiosilveira/inline-function-refactoring/commit/3fe61cc992e099ad4882105f2e4ae1a5e0ecbbfd) | inline moreThanFiveLateDeliveries call      |
| [33dd6b6](https://github.com/kaiosilveira/inline-function-refactoring/commit/33dd6b6996abad72b4a88deb9863ecb1bfcf5fc1) | remove moreThanFiveLateDeliveries function  |

The full commit history can be seen in the [Commit History tab](https://github.com/kaiosilveira/inline-function-refactoring/commits/main).

### Working example #2: The reportLines function

#### Before

Initial code for `report-lines.js`:

```javascript
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}
```

#### After

Final code for `report-lines.js`:

```javascript
function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);

  return lines;
}
```

#### Test suite

The test suite for `report-lines.js` includes a test that asserts that the `name` and `location` fields are being returned with their expected values. This should be enough to get us covered while performing the refactoring steps.
For implementation details, see [report-lines.test.js](./report-lines.test.js).

#### Steps

Similar to what we've done in the previous example, we start by renaming the fist parameter:

```diff
diff --git a/report-lines.js b/report-lines.js
@@ -4,9 +4,9 @@ function reportLines(aCustomer) {
   return lines;
 }

-function gatherCustomerData(out, aCustomer) {
-  out.push(['name', aCustomer.name]);
-  out.push(['location', aCustomer.location]);
+function gatherCustomerData(lines, aCustomer) {
+  lines.push(['name', aCustomer.name]);
+  lines.push(['location', aCustomer.location]);
 }

 module.exports = { reportLines, gatherCustomerData };
```

And then we can be as careful as possible and move one statement to the caller at a time. We first move the aggregation of the `name` field:

```diff
diff --git a/report-lines.js b/report-lines.js
@@ -1,11 +1,11 @@
 function reportLines(aCustomer) {
   const lines = [];
+  lines.push(['name', aCustomer.name]);
   gatherCustomerData(lines, aCustomer);
   return lines;
 }

 function gatherCustomerData(lines, aCustomer) {
-  lines.push(['name', aCustomer.name]);
   lines.push(['location', aCustomer.location]);
 }
```

And then we move the aggregation of the `location` field:

```diff
diff --git a/report-lines.js b/report-lines.js
@@ -1,12 +1,11 @@
 function reportLines(aCustomer) {
   const lines = [];
   lines.push(['name', aCustomer.name]);
+  lines.push(['location', aCustomer.location]);
   gatherCustomerData(lines, aCustomer);
   return lines;
 }

-function gatherCustomerData(lines, aCustomer) {
-  lines.push(['location', aCustomer.location]);
-}
+function gatherCustomerData(lines, aCustomer) {}

 module.exports = { reportLines, gatherCustomerData };
```

And finally we can delete `gatherCustomerData`:

```diff
diff --git a/report-lines.js b/report-lines.js
@@ -2,10 +2,8 @@ function reportLines(aCustomer) {
   const lines = [];
   lines.push(['name', aCustomer.name]);
   lines.push(['location', aCustomer.location]);
-  gatherCustomerData(lines, aCustomer);
+
   return lines;
 }

-function gatherCustomerData(lines, aCustomer) {}
-
-module.exports = { reportLines, gatherCustomerData };
+module.exports = { reportLines };
```

And we are done.

#### Commit history

See below a chronology (from top to bottom) of all the refactoring steps:

| Commit SHA                                                                                                             | Message                                                                      |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [8c61f3f](https://github.com/kaiosilveira/inline-function-refactoring/commit/8c61f3f8c241c81530cbe32d99da087f5cf02d66) | rename gatherCustomerData first parameter                                    |
| [ffdf99a](https://github.com/kaiosilveira/inline-function-refactoring/commit/ffdf99a8155bef3b34226dc3c6222b5f99d1c729) | move aggregation of the name field at gatherCustomerData into the caller     |
| [27e61c8](https://github.com/kaiosilveira/inline-function-refactoring/commit/27e61c8594a695a6dd168cd5f026b1f7ea70c2b9) | move aggregation of the location field at gatherCustomerData into the caller |
| [f6464dc](https://github.com/kaiosilveira/inline-function-refactoring/commit/f6464dcd17fd15bb7310b02effd56ec135de1958) | delete gatherCustomerData function                                           |

The full commit history can be seen in the [Commit History tab](https://github.com/kaiosilveira/inline-function-refactoring/commits/858813b15d92ebfe46c85de345251bb0bfb37093).
