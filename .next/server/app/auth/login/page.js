(()=>{var e={};e.id=716,e.ids=[716],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2234:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>c,pages:()=>u,routeModule:()=>f,tree:()=>d}),r(5293),r(4968),r(5866);var n=r(3191),o=r(8716),a=r(7922),s=r.n(a),i=r(5231),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let d=["",{children:["auth",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5293)),"/Users/jeremiahlena/Desktop/code-garden/src/app/auth/login/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4968)),"/Users/jeremiahlena/Desktop/code-garden/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],u=["/Users/jeremiahlena/Desktop/code-garden/src/app/auth/login/page.tsx"],c="/auth/login/page",m={require:r,loadChunk:()=>Promise.resolve()},f=new n.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/auth/login/page",pathname:"/auth/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5099:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},8272:(e,t,r)=>{Promise.resolve().then(r.bind(r,7073))},9120:(e,t,r)=>{Promise.resolve().then(r.bind(r,1012))},5047:(e,t,r)=>{"use strict";var n=r(7389);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})},3893:(e,t,r)=>{"use strict";r.d(t,{PB:()=>i,Pw:()=>c,Px:()=>a,RU:()=>d,X8:()=>s,gL:()=>m,qQ:()=>u,xT:()=>l});var n=r(6966),o=r(5870);let{useLoginWithEmailMutation:a,useLoginWithPasswordMutation:s,useRegisterWithEmailMutation:i,useRegisterWithPasswordMutation:l,useSignInWithTokenMutation:d,useVerifyEmailMutation:u,useRequestPasswordResetMutation:c,useResetPasswordMutation:m}=(0,n.createApi)({baseUrl:o._n,apiName:"authApi",endpoints:e=>({loginWithEmail:e.mutation(e=>({url:"/login-with-email",method:"POST",body:{...e,clientHost:location.origin}})),loginWithPassword:e.mutation(e=>({url:"/login-with-password",method:"POST",body:e})),registerWithEmail:e.mutation(e=>({url:"/register-with-email",method:"POST",body:{...e,clientHost:location.origin}})),registerWithPassword:e.mutation(e=>({url:"/register-with-password",method:"POST",body:{...e,clientHost:location.origin}})),signInWithToken:e.mutation(e=>({url:`/sign-in-with-token/${e.token}`,method:"POST"})),verifyEmail:e.mutation(e=>({url:`/verify-email/${e.token}`,method:"POST"})),requestPasswordReset:e.mutation(e=>({url:"/request-password-reset",method:"POST",body:{email:e,host:location.origin}})),resetPassword:e.mutation(e=>({url:"/reset-password",method:"POST",body:e}))})}).actions},7073:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f});var n=r(326),o=r(1664),a=r(1190),s=r(7577),i=r(434),l=r(5999),d=r(3893),u=r(8201),c=r(7278),m=r(5047);let f=()=>{let[e,t]=(0,s.useState)(!1),[r,f]=(0,s.useState)(""),[h,p]=(0,s.useState)(""),{updateUserDetails:g}=(0,s.useContext)(c.Z),v=(0,m.useRouter)(),{trigger:x,loading:y}=(0,d.Px)(),{trigger:b,loading:N}=(0,d.X8)(),j=async t=>{t.preventDefault();try{if(e)await x({email:r}),l.Am.success("Mail sent",{description:"Check your email to log in"});else{let e=await b({email:r,password:h});if(e){localStorage.setItem("TOKEN",e.data.token);let t=(0,u.o)(e.data.token);g(t.user),l.Am.success("Signed in successfully",{description:e.message}),console.log(t.user),v.replace("/editor")}}}catch(e){l.Am.error("Login error",{description:JSON.stringify(e)})}};return n.jsx("div",{className:"min-h-screen flex items-center justify-center bg-background p-4",children:(0,n.jsxs)("div",{className:"w-full max-w-md space-y-8",children:[(0,n.jsxs)("div",{className:"space-y-2 text-center",children:[n.jsx("h1",{className:"text-2xl font-semibold tracking-tight text-foreground",children:"Welcome back"}),n.jsx("p",{className:"text-sm text-muted-foreground",children:"Sign in to your account"})]}),(0,n.jsxs)("div",{className:"space-y-4",children:[(0,n.jsxs)(o.z,{variant:"outline",className:"w-full justify-center",onClick:()=>t(!e),children:["Continue with ",e?"password":"email"]}),(0,n.jsxs)("div",{className:"relative",children:[n.jsx("div",{className:"absolute inset-0 flex items-center",children:n.jsx("span",{className:"w-full border-t border-border"})}),n.jsx("div",{className:"relative flex justify-center text-xs uppercase",children:n.jsx("span",{className:"bg-background px-2 text-muted-foreground",children:"or"})})]}),(0,n.jsxs)("form",{className:"space-y-4",onSubmit:j,children:[n.jsx("div",{className:"space-y-2",children:n.jsx(a.I,{value:r,onChange:e=>f(e.currentTarget.value),id:"email",placeholder:"you@example.com",type:"email",autoCapitalize:"none",autoComplete:"email",autoCorrect:"off"})}),!e&&(0,n.jsxs)("div",{className:"space-y-2",children:[n.jsx("div",{className:"flex items-center justify-between",children:n.jsx(a.I,{id:"password",placeholder:"••••••••",type:"password",autoCapitalize:"none",autoCorrect:"off",value:h,onChange:e=>p(e.currentTarget.value)})}),n.jsx("div",{className:"flex items-center justify-end",children:n.jsx(o.z,{variant:"link",className:"px-0 font-normal text-xs text-muted-foreground hover:text-primary",asChild:!0,children:n.jsx(i.default,{href:"/auth/forgot-password",children:"Forgot Password?"})})})]}),n.jsx(o.z,{className:"w-full bg-primary hover:bg-primary/90",loading:y||N,children:"Sign In"})]}),(0,n.jsxs)("div",{className:"text-center text-sm text-foreground",children:["Don't have an account?"," ",n.jsx(i.default,{href:"/auth/signup",className:"text-primary hover:text-primary/90 hover:underline",children:"Sign Up Now"})]}),(0,n.jsxs)("p",{className:"text-center text-xs text-muted-foreground",children:["By continuing, you agree to our"," ",n.jsx("a",{href:"#",className:"hover:text-primary underline underline-offset-4",children:"Terms of Service"})," ","and"," ",n.jsx("a",{href:"#",className:"hover:text-primary underline underline-offset-4",children:"Privacy Policy"})]})]})]})})}},1012:(e,t,r)=>{"use strict";r.d(t,{default:()=>u});var n=r(326),o=r(7577),a=r(4831),s=r(7278),i=r(6966),l=r(5999),d=r(8201);function u({children:e}){let[t,r]=o.useState(),[u,c]=o.useState(!0);return o.useEffect(()=>{let e=localStorage.getItem("TOKEN");e&&r((0,d.o)(e).user),c(!1)},[]),n.jsx(a.f,{attribute:"class",defaultTheme:"dark",enableSystem:!0,children:n.jsx(s.Z.Provider,{value:{loading:u,userDetails:t,updateUserDetails:r},children:(0,n.jsxs)(i.QuokkaProvider,{getState:()=>{},children:[n.jsx(l.x7,{richColors:!0,position:"top-center"}),e]})})})}},1664:(e,t,r)=>{"use strict";r.d(t,{d:()=>d,z:()=>u});var n=r(326),o=r(7577),a=r(4214),s=r(9360),i=r(1223),l=r(3240);let d=(0,s.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),u=o.forwardRef(({className:e,variant:t,size:r,loading:o,asChild:s=!1,children:u,...c},m)=>{let f=s?a.g7:"button";return n.jsx(f,{...c,className:(0,i.cn)(d({variant:t,size:r,className:e}),"relative"),ref:m,children:o?n.jsx("div",{className:"absolute w-full h-full flex items-center justify-center top-0 left-0 bottom-0 right-0",children:n.jsx(l.Z,{className:"h-4 w-4 animate-spin"})}):u})});u.displayName="Button"},1190:(e,t,r)=>{"use strict";r.d(t,{I:()=>s});var n=r(326),o=r(7577),a=r(1223);let s=o.forwardRef(({className:e,type:t,...r},o)=>n.jsx("input",{type:t,className:(0,a.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:o,...r}));s.displayName="Input"},5870:(e,t,r)=>{"use strict";r.d(t,{Mj:()=>o,RH:()=>s,_n:()=>n,q2:()=>a});let n="https://c844-2a02-c206-2241-107-00-1.ngrok-free.app/auth",o=["Python","JavaScript","Java","C++","C#","Ruby","PHP","Swift","Go","Rust","TypeScript","Kotlin","Scala","R","MATLAB","Perl","Haskell","Lua","Julia","Dart"],a="Python",s={javascript:[{name:"Hello World",code:'console.log("Hello, World!");'},{name:"Array Operations",code:"const numbers = [1, 2, 3];\nnumbers.forEach(n => console.log(n));"},{name:"Basic Function",code:"function greet(name) {\n  return `Hello, ${name}!`;\n}"}],python:[{name:"Hello World",code:'print("Hello, World!")'},{name:"List Operations",code:"numbers = [1, 2, 3]\nfor n in numbers:\n    print(n)"},{name:"Basic Function",code:'def greet(name):\n    return f"Hello, {name}!"'}],java:[{name:"Hello World",code:'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'},{name:"Array Operations",code:"int[] numbers = {1, 2, 3};\nfor(int n : numbers) {\n    System.out.println(n);\n}"}],swift:[{name:"Hello World",code:'print("Hello, World!")'},{name:"Binary Search Tree",code:`class Node {
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
  }`},{name:"Two Sum",code:`func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
      var dict = [Int: Int]()
      for (i, num) in nums.enumerated() {
              if let j = dict[target - num] {
                      return [j, i]
              }
              dict[num] = i
      }
      return []
  }`},{name:"Trie Implementation",code:`class TrieNode {
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
  }`},{name:"Basic Concurrency",code:`func asyncFunction() async {
      await Task.sleep(1_000_000_000)  // Sleep for 1 second
      print("Async task completed")
  }
  
  // Usage:
  Task {
      await asyncFunction()
  }`}],dart:[{name:"Hello World",code:'void main() {\n  print("Hello, World!");\n}'},{name:"Binary Search Tree",code:`class Node {
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
  }`},{name:"Basic Concurrency",code:`Future<void> asyncFunction() async {
  await Future.delayed(Duration(seconds: 1));
  print('Async task completed');
  }
  
  void main() async {
  await asyncFunction();
  }`}],"c++":[{name:"Hello World",code:'#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'},{name:"Binary Search Tree",code:`struct Node {
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
  };`},{name:"Basic Concurrency",code:`#include <thread>
  #include <iostream>
  
  void asyncFunction() {
      std::this_thread::sleep_for(std::chrono::seconds(1));
      std::cout << "Async task completed\\n";
  }
  
  int main() {
      std::thread t(asyncFunction);
      t.join();
      return 0;
  }`}],rust:[{name:"Hello World",code:'fn main() {\n    println!("Hello, World!");\n}'},{name:"Binary Search Tree",code:`struct Node {
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
  }`},{name:"Basic Concurrency",code:`use std::thread;
  use std::time::Duration;
  
  fn main() {
      let handle = thread::spawn(|| {
              thread::sleep(Duration::from_secs(1));
              println!("Async task completed");
      });
      
      handle.join().unwrap();
  }`}]}},7278:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});let n=(0,r(7577).createContext)({updateUserDetails:()=>{},loading:!0})},1223:(e,t,r)=>{"use strict";r.d(t,{cn:()=>a});var n=r(1135),o=r(1009);function a(...e){return(0,o.m6)((0,n.W)(e))}},5293:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(8570).createProxy)(String.raw`/Users/jeremiahlena/Desktop/code-garden/src/app/auth/login/page.tsx#default`)},4968:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s,metadata:()=>a});var n=r(9510);r(1141);let o=(0,r(8570).createProxy)(String.raw`/Users/jeremiahlena/Desktop/code-garden/src/components/providers.tsx#default`);r(1159);let a={title:"Code Garden",description:"Your coding playground"};async function s({children:e}){return n.jsx("html",{lang:"en",suppressHydrationWarning:!0,children:n.jsx("body",{children:n.jsx(o,{children:e})})})}},1141:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[322,404,573],()=>r(2234));module.exports=n})();