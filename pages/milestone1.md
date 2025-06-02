---
transition: fade-out
layout: lblue-fact
---

Let's Go: Milestone 1

---
transition: fade-out
---

# Milestone 1

Writing text to a file

Objective: Update the hello world example to create a file and write “hello world” on it

Bonus: customize the text to write

<v-click>

For this milestone we will:
- Introduce __varibles__ and __conditionals__ in Go
- Use __functions calls__ to the standard library as seen in the "hello world" example
</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Variables

How Go declares and assigns them

::left::
<v-clicks>

There are two ways to declare variables:

- short initialization `:=` operator
- `var` keyword
    -  ⚠️ __type always goes after the name__

You can do multiple assignments:
- With hardcoded values
- Accepting the return value(s) of a function call

Any unused variables are considered compiler errors, use the _blank identifier_ `_` to ignore them

</v-clicks>

::right::

```go{all|1-5|1-5|7-8|10|all}{at:2}
a := 1

var hello string
var hello string = "hello, world!"
var hello = "hello, world!"

a, b, c := "hello", 1, "world"
f, err := os.Create("myFile") // returns a file pointer and an error

f, _ := os.Create("myFile") // the second value is not assigned
```

---
transition: fade-out
layout: two-cols-header
---

# Conditionals

Similar as in other languages but

::left::

<v-click>

For the `if` statements:
- Parenteshis `()` are not required inside conditions
- Brackets `{}` are always required around the body
</v-click>

<v-click>

For the `switch` statements:
- __Can switch on values of any type__
- `case` values are of the same type of the value on `switch`
- The `break` keyword is implied
</v-click>

<v-click>

⚠️ __`switch` statements are preferred to `if/else`__
</v-click>

::right::

```go{all|1-4|6-20|13-20|all}{at:1}
var i int
if i > 0 {
	fmt.Println(i)
}

switch i {
  case 0:
    log.Print("zero")
  default: // good practise to always add it
    log.Print(i)
}

switch { // == switch true
case i+2 == 10-i:
	fmt.Printf(“i+2 == 10-i holds for %d\n”, i)
case float64(i)/10.0 > math.Sqrt(float64(i)):
	fmt.Printf(“i/10.0 > sqrt(i) holds for %d\n”, i)
default:
    fmt.Println(i)
}

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 1

Writing text to a file: use pkg.go.dev to read the content of the packages

::left::

In your `main` function:

1. Create a file, using the `os` package
2. If there are any errors during the file creation
   - log them and exit with the `log` package
3. Write the "hello, world!" string to the file 
    - use the `fmt` package
4. Close the file

Bonus steps:

- Take the text to write as input of the application
  - use the `flag` package
- Test the `defer` keyword when closing the file


::right::

⚠️ __Go is case sensitive__

<v-click>
```go{all|10|11-13|14|15|all}
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	f, err := os.Create("./out/text")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintln(f, "Hello World!")
	f.Close()
}
```
</v-click>