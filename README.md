# 🌟 Welcome To (সহজ সরল সিম্পল) Assignment - 5
---
# Assignment-05: GitHub Issues Tracker


### **API Endpoints:**
###  **All Issues:** 
  - https://phi-lab-server.vercel.app/api/v1/lab/issues 


###  **Single Issue:**
   - https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}

   - Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33


###  **Search Issue:** https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

   - Example:  https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications
---
### **Some JavaScript QnA:**
    - 1️⃣ What is the difference between var, let, and const?
*Var is hoisted but it is a bad practice,
  let and const are also hoisted but in Temperal Dead Zone.
*Var can declare multiple variables with the same name, but when there will be multi-line code we can get confused,
  let and const can not declare multiple variables with the same name.
*Var and let can be reassigned,
  const can not be reassigned.
*var maintains only fuction scope but not block or global scope,
  let and const maintain all function and global scope.    

    - 2️⃣ What is the spread operator (...)?
*The spread operator (...) in JavaScript provides a simple and expressive way to expand elements from arrays, strings, or objects. It helps make code cleaner by reducing the need for manual copying or looping. 
*Syantax: array.forEach(function(element, index, array) {
         // perform action
         });
*Example: let a = [10, 20];
         let b = [30, 40, ...a, 50, 60];
         console.log(b);

    - 3️⃣ What is the difference between map(), filter(), and forEach()?
**forEach():**
  *It doesnot return anything, can modify the original array.
 * Use Case:- For side effects like console.log, API calls.
  *Example: const numbers = [1, 2, 3, 4];<br>
           numbers.forEach(num => console.log(num * 2)); // Outputs: 2, 4, 6, 8
**map():**
  *It returns a new array, doesnot modify the original array.
  *Use Case:- When you need a transformed array.
  *Syntax: const newArray = array.map(function(element, index, array) { <br>
          // return transformed element <br>
          });
  *Example: const numbers = [1, 2, 3, 4]; <br>
           const doubled = numbers.map(num => num * 2); <br>
           console.log(doubled); // Outputs: [2, 4, 6, 8]
**filter():**
  *It returns a new array based on the function condition, if no condition matches it returns an empty array, doesnot modify the original array.
  *Use Case:- For creating a subset of the original array based on certain criteria.
  *Syntax: const filteredArray = array.filter(function(element, index, array) { <br>
          // return boolean value <br>
          });
  *Example: const numbers = [1, 2, 3, 4]; <br>
           const evenNumbers = numbers.filter(num => num % 2 === 0); <br>
           console.log(evenNumbers); // Outputs: [2, 4]        

    - 4️⃣ What is an arrow function?
*Arrow function is the shortcut version of traditional function in ES6, which does not hoisted.
*Syntax: () => expression;

*param => expression;

*(param) => expression;

*(param1, paramN) => expression;

*() => {
  statements
};

*param => {
  statements
};

*(param1, paramN) => {
  statements
};

*Example: const add = (a, b) => a * b;

    - 5️⃣ What are template literals?
*Template literals are strings written using backticks (`) that allow variables and expressions to be embedded directly in ES6.It is used to dynamic a portion of code, which can be written in multi-line.
*Syntax: `Text before ${variableOrExpression} text after`;
*Example: const title = "Welcome"; <br>
         const html = `<h1>${title}</h1>`; <br>
         console.log(html);
         
---

## 🛠️ Technology Stack

- **HTML**
- **CSS** (Vanilla/Tailwind/DaisyUI)
- **JavaScript** (Vanilla)
