export const languages = [
    "Python", "JavaScript", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Rust",
    "TypeScript", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Haskell", "Lua", "Julia", "Dart"
] as const;

export type Language = typeof languages[number];
export const DefaultLanguage: Language = "Python"


export const codeTemplates = {
    javascript: [
      { name: "Hello World", code: 'console.log("Hello, World!");' },
      {
        name: "Array Operations",
        code: "const numbers = [1, 2, 3];\nnumbers.forEach(n => console.log(n));",
      },
      {
        name: "Basic Function",
        code: "function greet(name) {\n  return `Hello, ${name}!`;\n}",
      },
    ],
    python: [
      { name: "Hello World", code: 'print("Hello, World!")' },
      {
        name: "List Operations",
        code: "numbers = [1, 2, 3]\nfor n in numbers:\n    print(n)",
      },
      {
        name: "Basic Function",
        code: 'def greet(name):\n    return f"Hello, {name}!"',
      },
    ],
    java: [
      {
        name: "Hello World",
        code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      },
      {
        name: "Array Operations",
        code: "int[] numbers = {1, 2, 3};\nfor(int n : numbers) {\n    System.out.println(n);\n}",
      },
    ],
    swift: [
      {
          name: "Hello World",
          code: 'print("Hello, World!")'
      },
      {
          name: "Binary Search Tree",
          code: `class Node {
      var value: Int
      var left: Node?
      var right: Node?
      
      init(_ value: Int) {
              self.value = value
      }
  }
  
  class BST {
      var root: Node?
      
      func insert(_ value: Int) {
              root = insertRec(root, value)
      }
      
      private func insertRec(_ node: Node?, _ value: Int) -> Node {
              guard let node = node else { return Node(value) }
              if value < node.value {
                      node.left = insertRec(node.left, value)
              } else {
                      node.right = insertRec(node.right, value)
              }
              return node
      }
  }`
      },
      {
          name: "Two Sum",
          code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
      var dict = [Int: Int]()
      for (i, num) in nums.enumerated() {
              if let j = dict[target - num] {
                      return [j, i]
              }
              dict[num] = i
      }
      return []
  }`
      },
      {
          name: "Trie Implementation",
          code: `class TrieNode {
      var children: [Character: TrieNode] = [:]
      var isEndOfWord = false
  }
  
  class Trie {
      let root = TrieNode()
      
      func insert(_ word: String) {
              var current = root
              for char in word {
                      current = current.children[char, default: TrieNode()]
              }
              current.isEndOfWord = true
      }
  }`
      },
      {
          name: "Basic Concurrency",
          code: `func asyncFunction() async {
      await Task.sleep(1_000_000_000)  // Sleep for 1 second
      print("Async task completed")
  }
  
  // Usage:
  Task {
      await asyncFunction()
  }`
      }
  ],
  dart: [
      {
          name: "Hello World",
          code: 'void main() {\n  print("Hello, World!");\n}'
      },
      {
          name: "Binary Search Tree",
          code: `class Node {
  int value;
  Node? left;
  Node? right;
  
  Node(this.value);
  }
  
  class BST {
  Node? root;
  
  void insert(int value) {
      root = _insertRec(root, value);
  }
  
  Node _insertRec(Node? node, int value) {
      if (node == null) return Node(value);
      if (value < node.value) {
          node.left = _insertRec(node.left, value);
      } else {
          node.right = _insertRec(node.right, value);
      }
      return node;
  }
  }`
      },
      {
          name: "Basic Concurrency",
          code: `Future<void> asyncFunction() async {
  await Future.delayed(Duration(seconds: 1));
  print('Async task completed');
  }
  
  void main() async {
  await asyncFunction();
  }`
      }
  ],
  "c++": [
      {
          name: "Hello World",
          code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
      },
      {
          name: "Binary Search Tree",
          code: `struct Node {
      int value;
      Node* left;
      Node* right;
      Node(int x) : value(x), left(nullptr), right(nullptr) {}
  };
  
  class BST {
      Node* root = nullptr;
      
      Node* insert(Node* node, int value) {
              if (!node) return new Node(value);
              if (value < node->value)
                      node->left = insert(node->left, value);
              else
                      node->right = insert(node->right, value);
              return node;
      }
  public:
      void insert(int value) {
              root = insert(root, value);
      }
  };`
      },
      {
          name: "Basic Concurrency",
          code: `#include <thread>
  #include <iostream>
  
  void asyncFunction() {
      std::this_thread::sleep_for(std::chrono::seconds(1));
      std::cout << "Async task completed\\n";
  }
  
  int main() {
      std::thread t(asyncFunction);
      t.join();
      return 0;
  }`
      }
  ],
  rust: [
      {
          name: "Hello World",
          code: 'fn main() {\n    println!("Hello, World!");\n}'
      },
      {
          name: "Binary Search Tree",
          code: `struct Node {
      value: i32,
      left: Option<Box<Node>>,
      right: Option<Box<Node>>
  }
  
  impl Node {
      fn new(value: i32) -> Self {
              Node {
                      value,
                      left: None,
                      right: None
              }
      }
  
      fn insert(&mut self, value: i32) {
              if value < self.value {
                      match self.left {
                              None => self.left = Some(Box::new(Node::new(value))),
                              Some(ref mut node) => node.insert(value),
                      }
              } else {
                      match self.right {
                              None => self.right = Some(Box::new(Node::new(value))),
                              Some(ref mut node) => node.insert(value),
                      }
              }
      }
  }`
      },
      {
          name: "Basic Concurrency",
          code: `use std::thread;
  use std::time::Duration;
  
  fn main() {
      let handle = thread::spawn(|| {
              thread::sleep(Duration::from_secs(1));
              println!("Async task completed");
      });
      
      handle.join().unwrap();
  }`
      }
  ],
  }