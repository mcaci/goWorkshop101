---
transition: fade-out
layout: lblue-fact
---

Let's Go: Milestone 3

---
transition: fade-out
---

# Milestone 3

Creating, importing packages and testing them

## Objective

Extract the code of milestone 2 in a different package and add unit tests

<v-click>

## What we will see/use

- __Packages and imports__
- create new __functions__
- the concept of __Exported/Unexported__ (scope)
- __Unit tests__ using the standard library
</v-click>

---
transition: fade-out
---

# Packages

The smallest unit of Go code that can be distributed

<v-clicks>

A __package__ is a __set of symbols__ (functions, types, variables) that can be distributed to other packages to be used; in practice, it is a folder containing Go files

All Go files in the same package must have the same package declaration at the beginning of the file

```go
package myPackage
```

Importing a package differs if it comes from the standard library (`package_path`) or from a third-party `"module_path/package_path"`)

```go
import (
  "fmt" // from standard library
  “github.com/mcaci/lets-go-workshop/myPackage // from third-party
  // github.com/mcaci/lets-go-workshop is the module_path (which can be taken in go.mod file)
  // myimage is the package_path
)
```

When importing third-party packages, run `go mod tidy` at the root of the project to download the Go modules that contain them
</v-clicks>

---
transition: fade-out
layout: two-cols-header
---

# Functions

<br/>

::left::

Use `func` keyword to declare a function.

Return type(s) go at the end of the function.

Can omit a type in the parameter list if it is the same for the previous argument.

A function is also a _type_.

- It's zero value is `nil`


::right::

```go
// multiple return values
func parseColor(hex string) (color.RGBA, error) {...}
// type is omitted for parameters that share the same type
func sum(a, b int) int {...}
```

---
transition: fade-out
---

# Scopes

⚠️ __Go is case sensitive__

<v-clicks>

To reference a symbol with __public__ scope have it start with an __Uppercase__ letter

Symbols that have a public scope are said to be __exported__

Otherwise, they start with a __lowercase__ letter and are __unexported__, which means that they are __accessible only to the package__ where they are located

```go
package myPackage

// Exported/public symbols
type Age int
func Sum(a, b int) int { return a + b }
const BaseAge = Age(0)
var ErrAgeNotFound error // global variable: bad practice

// Unexported symbols: available only to myPackage packaged
func sum(a, b int) int { return a + b }
var errAgeNotFound error // package-level variable: to avoid as well
```
</v-clicks>

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 3

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

⚠️ __type always goes after the name__

<v-click>
````md magic-move {lines: true}
```go{all|10|11-13|14|15|all}
package main

import (
	"bytes"
	"fmt"
	"log"
	"os"

	"github.com/mcaci/goWorkshop101code/parse"
)

func main() {
	input, err := os.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}
	output, err := os.Create("output")
	if err != nil {
		log.Fatal(err)
	}
	defer output.Close()
	lines := bytes.Split(input, []byte{'\n'})
	for _, line := range lines {
		fmt.Fprintln(output, parse.Parse(string(line)))
	}
}
```

```go{all|9,17|14-16|all}
package parse

import (
	"strconv"
)

func Parse(input string) string {
	if _, err := strconv.ParseBool(input); err == nil {
		return "bool: " + input
	}
	if _, err := strconv.Atoi(input); err == nil {
		return "int: " + input
	}
	if _, err := strconv.ParseFloat(input, 64); err == nil {
		return "float: " + input
	}
	return "string: " + input
}

```

```go{all|9,17|14-16|all}
package parse

import (
	"strings"
	"testing"
)

func TestParseBool(t *testing.T) {
	input := "true"
	result := Parse(input)
	if !strings.HasPrefix(result, "bool") {
		t.Errorf("Parse(%q) = %q; Should start with %q", input, result, "bool")
	}
}
```
````
</v-click>