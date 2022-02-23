[1mdiff --git a/src/components/Select.js b/src/components/Select.js[m
[1mindex 2240935..4fe1c3b 100644[m
[1m--- a/src/components/Select.js[m
[1m+++ b/src/components/Select.js[m
[36m@@ -19,7 +19,7 @@[m [mexport default Select = props => {[m
     <>[m
       <select[m
         defaultValue={defaultValue}[m
[31m-        onChange={() => fn()}[m
[32m+[m[32m        onChange={e => fn(e.target.value)}[m
       >[m
         {options.map(option => ([m
           <Option [m
[1mdiff --git a/src/components/levels.js b/src/components/levels.js[m
[1mindex 29f390e..3f8ad20 100644[m
[1m--- a/src/components/levels.js[m
[1m+++ b/src/components/levels.js[m
[36m@@ -1,7 +1,7 @@[m
 export default levels = [[m
[31m-  {label: '2 x 2 - Baby',   value: 2},[m
[32m+[m[32m  {label: '2 x 2 - Baby', value: 2},[m
   {label: '3 x 3 - Easy', value: 3},[m
[31m-  {label: '4 x 4 - Medium',   value: 4},[m
[32m+[m[32m  {label: '4 x 4 - Medium', value: 4},[m
   {label: '5 x 5 - Hard', value: 5},[m
   {label: '8 x 8 - Expert', value: 8},[m
   {label: '12 x 12 - Brutal', value: 12},[m
