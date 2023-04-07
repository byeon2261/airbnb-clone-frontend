# Airbnb clone Front-end

## 17 Front-End SetUp

#### [1_React]

드디어 프론트 엔드를 시작한다! create-react-app을 사용하며 chakra 라이브러리를 사용할 것이다.
스크립트는 타입스크립트를 사용한다.

우선 react를 설치한다.

```shell
$ npm create-react-app airbnb-clone-frontend --templete=typescript
# Happy hacking!
```

#### [Git]

일부 파일들 및 코드를 삭제 해준다.
정리가 된다면 git에 연결해준다.

```shell
$ git remote add origin [연결시킬 주소]
```

#### [2_Chakra]

<https://chakra-ui.com/getting-started>

이제 차크라 ui 를 설치한다.

```shell
$ npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### [1_React]

6.4버젼 react router를 설치한다.

```shell
$ npm i react-router-dom
```

#### [2_Chakra]

설치가 다 되었다면 ChakraProvider로 app을 감싸준다.
@src/index.tsx

```tsx
import { ChakraProvider } from "@chakra-ui/react";

root.render(
	...
	<ChakraProvider>  // 해당 태그를 엔터쳐서 입력하면 자동으로 import해준다.
		<App />
	</ChakraProvider>
	...
);
```

chakra의 특정 설정을 사용할 수 있게 되었다. 해당 테마와 구성을 컴포넌트에 전달하는 가장 좋은 방법이다.

react앱 동작확인을 한다.

```shell
$ npm run start
```

오류없이 빈 브라우져가 나온다.
chakra 객체를 넣어보겠다. 태그 입력 도중에 태그 추천 리스트의 오른쪽에 사용되는 라이브러리 이름이 뜬다. chakra-ui 라 뜬다.

@src/App.tsx

```tsx
function App() {
  return (
    <div>
      <Text>It's works!!</Text>
    </div>
  );
}
```

텍스트가 브라우져에 나오면 react설치 및 차크라 ui 적용이 완료된다.

차크라는 이쁘게 디자인되는 것도 있지만 기본으로 갖고 오는 설정들이 많다.

```tsx
<Text color={"red.600"} fontSize={"6xl"}>
  {" "}
  // 색깔을 섞는 비율과 크기가 기본을 제공되는 값이다. 자동완성도 빠르다. It's works!!
</Text>
```

이외에도 반응형 화면을 위한 문법이 있다.

#### [1_React]

브라우져 탐색 표시줄에 나타날 URL을 리액트-라우터에 설명하는 작업을 진행한다. 해당 URL에 위치할 때 보여줄 컴포넌트를 선택해야 한다.
로직은 기존 라우터 5버젼과 같지만 그걸 설명하는 방식, 즉 API가 달라져서 코드가 약간 달라졌다.

@src/router.tsx 를 생성해준다. 기존에 5버젼에서 라우터를 구성하던 로직이다.

@src/router.tsx

```tsx
<Router>
  <Route path="/">
    <Home>  # 컴포넌트
  </Route>
  <Route path="/movie/:id">
    <MovieDetail>
  </Route>
</Router>
```

url을 보내면 라우터에서 해당 url을 대조해서 해당하는 컴포넌트를 보내준다.
하지만 6.4버젼은 조금 다르다.
이번 프로젝트는 루트(홈) 컴포넌트를 생성한다. 루트 컴포넌트가 모는 컴포넌트의 상위컴포넌트가 될거다.
해당 컴포넌트위에 자식 컴포넌트가 상속받아 화면을 구성한다.

router.ts에서 라우터 컴포넌트를 가져와야하니 .tsx로 변경하며 components폴더를 생성하여 root.tsx를 생성해준다.

@src/components/root.tsx

```tsx
export default function Root() {
  return <h1>I'm Root</h1>;
}
```

root를 router에 포함시켜준다. 6.4버젼으로 구성하겠다.

@src/router.tsx

```tsx
import { createBrowserRouter } from "react-router-dom"; // import는 태그를 완성하면 자동으로 import된다.
import Root from "./components/root";

const router = createBrowserRouter([
  // 이안에 라우터 배열을 둘거다.
  {
    path: "/",
    element: <Root />,
  },
]);
```

App.tsx는 삭제한다.
@index.tsx에 App를 대신에 router를 구성한다.

```tsx
import router from "./router";

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} /> // RouterProvider로 공급 태그를
      사용한다. router를 지정해야한다.
    </ChakraProvider>
  </React.StrictMode>
);
```

router가 import가 되지 않을 것이다. router를 export해줘야 한다.
@router

```tsx
...
export default router;
```

router구성이 완료되었다. 브라우져에서 root에 등록한 텍스트가 표시된다.

해당 root에 header와 footer를 구성하며 다른 페이지에서 중간 화면을 렌더링하도록 구성하겠다.
src에 route폴더를 생성하여 home.tsx, users.tsx파일을 생성한다.

```tsx
export default function Home() {
  // Users 도 같게 적용
  return <span>...</span>;
}
```

router에 자식 컴포넌트로 추가해준다.

```tsx
path: "/",
element: <Root />,
children: [
	{
		path: "",
		element: <Home />,
	},
	{
		path: "users",
		element: <Users />,
	},
],
```

@Root.tsx에 Outlet태그를 추가해준다.

```tsx
export default function Root() {
  return (
    <h1>
      I'm Root
      <Outlet /> // children components가 여기에 적용된다.
    </h1>
  );
}
```

브라우져에 확인을 하면 URL에 따라 home 택스트와 users택스트가 추가된다.

error페이지 컴포넌트를 생성하여 적용한다. route에 NotFound를 생성한다.
@src/routes/NotFound.tsx

```tsx
export default function NotFound() {
  return <h1>Not Found</h1>;
}
```

@src/router.tsx

```tsx
const router = createBrowserRouter([
{
	...
	errorElement: <NotFound />,
...
```

페이지를 찾지 못할 경우 NotFound페이지를 렌더링한다.

#### [2_chakra]

NotFound페이지를 chakra 태그로 구성해본다.

```tsx
export default function NotFound() {
  return (
    // 수직방향으로 요소를 배열한다.
    <VStack>
      <Heading>Page not found</Heading> // 제목
      <Text>It's seems that you're lost.</Text>
      <Button>Go Home</Button>
    </VStack>
  );
}
```

기본 속성들로 제법 예쁘게 구성이 된다.

chakra는 기존 css속성을 단축해서 사용가능하다.
<https://chakra-ui.com/docs/styled-system/style-props>

```tsx
<VStack justifyContent={"center"} minH="100vh">  // minH: minHeight
```

차크라에 button에는 variant라는 속성이 있다.
<https://chakra-ui.com/docs/components/button/usage#button-variants>

colorScheme, emoticon 등 기능이 있다.

```tsx
<Button colorScheme={"red"} variant={"link"}>
  Go Home &rarr;
</Button>
```

[1_React]

button을 react-router-dom의 Link로 덮어준다.

```tsx
<Link to="/">
  <Button colorScheme={"red"} variant={"link"}>
    Go Home &rarr;
  </Button>
</Link>
```

버튼 클릭시 홈으로 이동한다.

## 18. Chakra ui

[2_Chakra]

root에 header를 생성한다.

```tsx
export default function Root() {
  return (
    <Box>
      I'm Root
      <Outlet />
    </Box>
  );
}
```

해당 박스를 header로 구성해본다.
airbnb 아이콘을 넣어본다. react-icon에서 확인할 수 있다.
<https://react-icons.github.io/react-icons/>

react-icon을 설치해준다.

    $ npm install react-icons --save

아이콘중 Font Awesome을 사용한다.

```tsx
import { FaAirbnb } from "react-icons/fa";  // 이모티콘을 추가할때에는 import를 한 후 태그를 써준다.

...
		<FaAirbnb />  // 사이트에서 복사한 태그명을 사용하면 된다.
```

색상 및 간격에 대한 chakra의 설정값들을 알고 사용하면 유용하다.
디자인이 흐트러지지않고 적용이 가능하다.
<https://chakra-ui.com/docs/styled-system/theme>

root의 header를 구성해본다.

```tsx
<HStack
  justifyContent={"space-between"}
  px={"5"} // px == paddingX
  py={"10"} // px == paddingY
  borderBottomWidth={1} // border선이 밑에서만 굴기 1로 생성되면 색깔도 자동으로 gray.500으로 설정해준다.
>
  <Box color={"red.500"}>
    {" "}
    // Font Awesome태그는 chakra태그가 아니기때문에 color값을 #ffefd 스타일로 직접넣어줘야한다.
    // 대신 Box 부모 태그를 만들어서 box에다 charkra color 속성을 적용해준다.
    <FaAirbnb size={"48"} /> // Font Awesome 태그. == 48px
  </Box>
  <HStack spacing={2}>
    {" "}
    // spacing: 태그사이의 간격. == 2rem
    <IconButton // Icon을 넣는 버튼
      variant={"ghost"}
      aria-label="Toggle dark mode"
      icon={<FaMoon />} // 태그형태로 넣어줘야 한다.
    />
    <Button>Log in</Button>
    <Button colorScheme={"red"}>Sign in</Button>
  </HStack>
</HStack>
```

좌측엔 airbnb 아이콘, 우측엔 login과 sign up 버튼을 생성했다.

log in 모달을 구현한다.
이제 모달을 생성하겠다. modal은 표현되는 부분이 아니며 데이터 변경만 하기때문에 위치는 중요하지 않다.

```tsx
<Modal isOpen={false}></Modal>
```

모달을 변경시킬 함수를 생성한다.

```tsx
const { isOpen, onClose, onOpen } = useDisclosure(); // react훅(chakra UI)
```

useDisclosure() 에서 'isOpen' boolean과 close, open 함수를 제공해준다.
modal을 구성해본다.

```tsx
...
	<Button onClick={onOpen}>Log in</Button>
...
<Modal onClose={onClose} isOpen={isOpen}>
	<ModalOverlay />  // 페이지를 어둡게해서 model을 더 집중적으로 만들어준다.
	<ModalContent>
		<ModalHeader>Log In</ModalHeader>
		<ModalBody>
			<Input variant={"filled"} placeholder={"Username"} />
			<Input variant={"filled"} placeholder={"Password"} />
			<Button colorScheme={"red"} w={"100%"}>  // w == wight. 길이를 모달창에 맞춘다.
					Log In
			</Button>
		</ModalBody>
	</ModalContent>
</Modal>
```

modal이 생성되고 사라질때 애니메이션도 있다.
input들과 Button이 간격이 없다. stack태그로 감싸준다. input창에 이모티콘도 추가해준다.

```tsx
<VStack>
	<InputGroup>  # Input창안에 여러가지 요소를 넣을경우 사용한다. 요소간에 간격을 만들어 준다
		<InputLeftElement ... children={<FaUserEdit />} />  # 이모티콘을 왼쪽에 추가해준다
		<Input ... placeholder={"Username"} />
	</InputGroup>
	...
</VStack>
```

sns 로그인 버튼을 구현한다. 구현 전 컴포넌트를 각 기능으로 분리하는 방식으로 리팩토링해보도록 하겠다.
header, log in, sns log in 등 각각 분리한다.
우선 소셜 로그인 부분부터 작업한다.

```tsx
<HStack my={8}>  // 기존 로그인 컴포넌트와 sns로그인 버튼 간격을 둔다.
	<Divider />  // 가로로 절취선같이 선이 나눠진다. #18.2 Sign Up Modal_1 이미지 참조
	<Text
		textTransform={"uppercase"}  // 대문자 변환
		fontSize={"xs"}
		as={"b"}  // bold체
	>
	...
	<Divider />  // 세로로 나누는 태그도 있다.
...
	<Button leftIcon={<FaGithub />} ...>  // 버튼에서는 ...Icon 속성을 사용하여 이미지를 넣을 수 있다
	...
```

![#18.2 Sign Up Modal_1](https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2318.2%20Sign%20Up%20Modal_1.png)

설정 적용확인 후 절취선과 sns 로그인 버튼은 컴포넌트 분리를 한다. 해당 태그를 Box태그로 감싸서 새 컴포넌트에 옮겨준다.
@scr/components/socialLogin.tsx 생성

@socialLogin.tsx

```tsx
export default function SocialLogin() {
  return <Box mb={4}>// ...root에 있던 sns로그인 코드</Box>;
}
```

root코드의 기존에 있던 코드가 비워진 곳에 새로 생성한 컴포넌트 태그를 사용한다.

```tsx
...
<SocialLogin />
...
```

옮기기 전과 똑같이 동작하는 것을 확인한다.

같은 방식으로 login을 새로 컴포넌트를 생성하여 옮겨준다.

```tsx
export default function LoginModal({onClose, isOpen}) {  # root에서 해당값을 받아와야한다.
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			...
		</Modal>
```

root에서 받을 값의 type을 정의하기 위한 interface를 구성한다.

```tsx
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

type을 지정해준다.

```tsx
... LoginModal( {onClose, isOpen}:LoginModalProps )
```

root에서 해당 값을 보내줘야한다. root에 컴포넌트 태그를 추가해준다.

```tsx
...
<LoginModal isOpen={isOpen} onClose={onClose} />
...
```

header도 새로 컴포넌트를 생성한다. useDisclosure 훅도 같이 옮겨준다.
작은것부터해서 큰것까지 전부 컴포넌트로 이동시켰다.

SignUpModal을 구현한다. SignUpModal은 LoginModal과 유사하기때문에 LoginModal을 복사해와서 변경한다.

root에서 훅에서 갖고온 변수 명을 변경하여 login과 signUp에 각각 넣어주자.

```tsx
const {
	isOpen: isLoginOpen,
	onClose: onLoginClose,
	onOpen: onLoginOpen,
} = useDisclosure();
...
	<Button onClick={onLoginOpen}>Log in</Button>
	<LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
```

다크모드 버튼을 구현한다. 다크모드를 사용할때 사용자의 셋팅값을 가져와서 보여주는 것과 상관없이 기본 default값을 보여주며 변경할지 결정해야한다.
src/theme.ts를 생성한다.

```tsx
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";  // type: 타입값만 상속한다

const config:ThemeConfig = {  // ThemeConfig 타입을 지정해주면 자동완성기능을 사용할 수 있다.
	initialColorMode:"system"  // :<<< light, dark, system
	useSystemColorMode: false,  // 유저의 시스템 색깔모드를 따라갈 것인지 정의. false로 해야 버튼으로 변경이 가능
}
const theme = extendTheme({ config });

export default theme;
```

해당 설정값을 chakraProvider의 속성에 넣어서 확장해준다.
@src/index.tsx

```tsx
...
<ChakraProvider theme={theme}>  # theme를 import해준다.
...
```

color mode sript를 추가한다. 해당 스크립트는 이전에 사용자가 선택한 색을 로컬 저장소에 저장한다.

```tsx
...
<ChakraProvider theme={theme}>
	<ColorModeScript initialColorMode={theme.config.initialColorMode} />
...
```

브라우져에 local storage에서 color-mode값이 저장된다. 해당값을 삭제하고 theme에 color값을 변경하면 화면이 변경된다.
값을 변경해주는 toggle기능을 구현한다.

```tsx
const { colorMode, toggleColorMode } = useColorMode();  # 훅

...
<IconButton
	onClick={toggleColorMode}
	...
	icon={colorMode === "light" ? <FaMoon /> : <FaSun />}  # light일 경우 달 모양이다.
/>
```

color mode에 따라 이모티콘이 변경된다.

component중 color mode가 변경되지 않길 원한다면 chakra에서 지원하는 light mode(or dark mode) 태그로 감싸주면 된다.

```tsx
<LightMode>...</LightMode>
```

특정 색깔모드일 때 색을 지정할 수 있다.
상단에 달모양과 해모양 이모티콘 변경하듯 속성을 변경하는 대신 chakra에서 이 기능을 대신할 hook이 있다.

```tsx
// 첫번째 매개변수에는 light일때 두번째 매개변수는 dark일때 반환된다.
const logoColor = useColorModeValue("red.500", "red.200");

<Box color={logoColor}>
  <FaAirbnb size={"48"} />
</Box>;
```

다크모드 변경 아이콘도 훅을 이용하여 정의하도록 한다. componenet 는 대문자로 정의한다.

```tsx
const Icon = useColorModeValue(FaMoon, FaSun);

<IconButton
	...
	icon={<Icon />}
/>
```

! 컴포넌트는 대문자로 정의해야한다!
useColorMode() 에 colorMode는 이제 필요 없기때문에 삭제해준다.

room을 보여줄 그리드를 구성한다.

```tsx
// columnGap: x축 간격. rowGap: y축 간격. templateColumns: column을 격자로 생성해준다. (5, 1fr): 5컬럼을 최대크기로 배치
<Grid ... columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
	<VStack alignItems={"flex-start"}>  // 기본 중간정렬이다. flex-start로 앞으로 정렬
		// hidden값을 부여해야 rounded값이 box안에 이미지에 적용된다.. rounded: border-radios기능
		<Box overflow={"hidden"} ... rounded={"3xl"}>
		...
			<Grid gap={2} templateColumns={"6fr 1fr"}>  // 6:1 비율로 컬럼을 배치한다.
				<Text display={"block"}  noOfLines={1} ...>  // block why??. 텍스트가 일정이상 줄이 넘어가면 생략한다
			...
```

room 이미지 위에 하트 버튼을 생성한다.

```tsx
<Box position={"relative"} ...>
	<Button
		variant={"unstyled"}
		position="absolute"
		top={2}  # 상단 우측
		right={0}
		color="white"
	>
		<FaRegHeart size="20px" />
	</Button>
...
```

그리드 화면 크기별 그리드 배열을 변경하는 기능을 구현한다.
그리드 안에 많은 배열값 함수를 생성하여 여러개 room객체를 생성한다.

```tsx
<Grid ... >
	{[
		1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 4, 5, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4, ...
	].map((index) => (
		<VStack ...> ...  # 기존에 생성한 room
	))}
</Grid>
```

room객체가 여러개가 생성이된다.
크기별 객체 배열을 설정한다. 그리드에 속성을 변경한다.

```tsx
<Grid
	...
	templateColumns={{
		base: "1fr",  // base: 차크라 자체가 안드로이드를 위해 만들어졌기 때문에 base는 안드로이드 화면 크기이다.
		sm: "1fr",
		md: "1fr 1fr",
		lg: "repeat(3, 1fr)",  //  === "1fr 1fr 1fr"
		xl: "repeat(4, 1fr)",
		"2xl": "repeat(5, 1fr)",  // 일반 pc 풀화면 크기. 숫자가 들어갈경우에는 ""으로 묶어줘서 str으로 보내준다.
	}}
>
```

화면 크기가 변경될 때마다 그리드 표시가 변경된다.

화면이 변경될때 header의 요소들이 위치가 고정되어있다. header요소들도 화면크기에 따라 속성이 변경되도록 적용한다.

```tsx
<Stack  // direction을 변경하기 위해서 VStack에서 Stack으로 변경한다. Stack은 기본 가로모드이다.
	alignItems="center"
	direction={{
		sm: "column",  // 세로로 배열
		md: "row",  // 가로
	}}
	spacing={{
		sm: 4,  // 세로로 배열시 간격을 두기 위함
		lg: 0,
	}}
	...
>
```

home에서 작성한 room코드는 room컴포넌트로 옮긴다.
@src/components/Room.tsx 생성.

다크모드일때 텍스트 색을 일부 수정한다.

```tsx
const gray = useColorModeValue("gray.600", "gray.300");

<Text fontSize={"sm"} color={gray}>  # "gray.600" -> gray. 다크모드일때 잘 안보인다.
```

이번엔 로딩화면을 구성한다. 최근 페이스북이나 인스타그램 등 사이트에서 자주 사용되는 skelton을 사용해 본다.
@routes/Home.tsx

```tsx
<Box>
  <Skeleton rounded={"2xl"} mb={8} h="260" /> # 이미지 크기와 같게 생성된다.
  <SkeletonText noOfLines={2} w={"90%"} mb={5} /> # 텍스트라인으로 생기는 뼈대이다.
  기본값은 3줄이다.
  <SkeletonText noOfLines={1} w={"40%"} />
</Box>
```

room객체에 별점에 마우스를 올려놓으면 색깔이 변경되는 기능을 구현 한다.

```tsx
<HStack _hover={{ color: "red.100" }} ...>  // _를 쓰고 css에서 사용하던 에니매이션 기능을 사용할 수 있다.
```

이제 API에서 데이터를 가져오는 것을 진행할 것이다.

## 19 React Query

#### [1_React]

room url을 fetch한다.

@src/routes/home.tsx

```tsx
import { useEffect } from "react";

useEffect(() => {
	fetch("http://127.0.0.1:8000/api/v2/rooms/");  # url 끝에 /를 붙여줘야한다.
}, []);
```

react 프로젝트를 실행하면 검사창에서 CORS에러가 발생한다. 서버가 사용자에게 서버로부터 무언가를 fetch하는 것을 허용하지 않는다는 것이다.

#### backend.[2_Django]

backend셋팅을 한다. aribnb-clone-backend/info/info_0_airbnb_clone_all.md 참조
...
백엔드 셋팅이 완료되면 console창에 CORS에러가 발생하지 않는다. 네트워크에서도 fetch에러가 발생하지 않아야한다.

#19.0 Manual Fetching_1 참조.

![#19.0 Manual Fetching_1](https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2319.0%20Manual%20Fetching_1.png)

앞서 만든 fetch를 State에 넣는다. 로딩중인 state와 room데이터를 보여줄 state를 생성해야한다.

```tsx
const [isLoading, setIsLoading] = useState(true);
const [rooms, setRooms] = useState();  # (): undefined
const fetchRooms = async () => {
	const response = await fetch("http://127.0.0.1:8000/api/v2/rooms/");
	const json = await response.json();
	setRooms(json);
	setIsLoading(false);
};
useEffect(() => {
	fetchRooms();
}, []);
return (
	<Grid ...>
		{isLoading ? (
			<>
				<RoomSkeleton />
				<RoomSkeleton />
				<RoomSkeleton />
				...
			</>
		) : null}
	</Grid>
)
```

이건 예전의 fetch방식이다.
이렇게 하나의 컴포넌트로 데이터를 fetch할 수 있지만 애플리케이션의 규모가 커지면 다른방법이 필요하다.
그 방법은 다음에 변경하고 room데이터를 가져오겠다.

```ts
{
  rooms.map((room) => <Room />);
}
```

화면변경없이 잘 나온다

이젠 실제 데이터를 표현하도록 하겠다.
이제 prop로 실제 데이터를 가져온다.

@components/Room.tsx

```tsx
interface RoomProps {
	imgUrl: string;
	name: string;
	rating: number;
	...
}

export default function Room({
	imgUrl,
	name,
	rating,
	...
}: RoomProps) {
	...
	<Image src={imgUrl} ... />  // {}: 변수값
	...
```

데이터를 다 변경한다.
home state에서 데이터를 보내준다.

```tsx
interface IPhoto {  // photos array 정의
	pk: number;
	file: string;
	description: string;
}

interface IRoom {
	pk: number;
	name: string;
	...
	photos: IPhoto[];  // Photo interface
}
...
	const [rooms, setRooms] = useState<IRoom[]>([]);
	...
		{rooms.map((room) => (
			<Room
				imgUrl={rooms.photos[0]}
				name={room.name}
				rating={room.rating}
				...
			/>
		))}
```

### 19.2 React Query

#### [1_React]

예전에 react query라고 불렸던 tenstack query를 설치하여 사용한다. (이름을 변경)
<https://tanstack.com/query/latest/docs/react/installation>

    $ npm i @tanstack/react-query

tanstack의 QueryClientProvider로 기존 앱을 감싸준다.

@src/index.tsx

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
	...
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={client}> // 앱을 감싸준다.
				...
			<QueryClientProvider>
		...
```

react query를 사용하면 캐싱을 저장하여 다시 화면으로 돌아올때 다시 fetch를 하며 로딩이 하지않고 바로 화면을 보여준다.
api.ts를 생성하여 api를 패치하기 위한 함수를 다 옮겨준다.
@src/api.ts

```tsx
	const BASE_URL = "http://127.0.0.1:8000/api/v2/";

	export async function getRooms() {  # async: 로딩중인지 확인하기위해 싱크
		const response = await fetch(`${BASE_URL}rooms/`);
		const json = await response.json();
		return json;
	}
```

src/routes/home의 소스를 옮겨준다.
home에 State소스와 useEffect 소스를 삭제하고 useQuery훅을 사용한다.

```tsx
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";

export default function Home() {
	// isLoading: 로딩중일 경우 true를 받음. data:json데이터. ["rooms"]: 데이터를 찾는 키, 해당 키로 값을 찾아올 수 있음.
	const { isLoading, data } = useQuery(["rooms"], getRooms);  # rooms이름 아래로 데이터들이 저장된다.
	...
	{data.map((room) => (  # rooms -> data
		...
	))}
```

코드를 작성하면 room 타입이 지정되지않아서 요류가 발생한다.

```tsx
const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);
...
{data?.map((room) => (  // rooms -> data  # data?: data는 null일 수 있다. ?를 붙여준다.
	...
))}
```

### 19.3 Axios

#### [1_React]

fetch하고 url이 확인하는 기능을 대신하여 axios를 설치한다. axios는 fetch adapter같은 거다.

    $ npm i axios

fetch대신 axios를 넣어준다.

```ts
import axios from "axios";

export async function getRooms() {
  const response = await axios.get(`${BASE_URL}rooms/`);
  return response.data; // json data
}
```

axios에 base url을 지정하여 관리할 수 있다.

```ts
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v2/",
});

export async function getRooms() {
  const response = await instance.get("rooms/"); // base_url에 더해져 url이 형성된다.
  return response.data;
}
```

getRooms()를 화살표 함수로 함축해본다.

```ts
export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);
```

### 19.4 Room Detail

#### [1_React]

react-router의 Link를 사용하여 room앱을 감싼다.
@src/components/room.tsx

```tsx
import { Link } from "react-router-dom";

export default function Room(
	...
) {
return (
	<Link to={"[임의의 url]"}>
		<VStack alignItems={"flex-start"}>
			...
		</VStack>
	</Link>
```

브라우져에서 room 객체를 클릭하면 not found화면으로 이동된다.
home에서 pk데이터를 room에 전달하여 url에 추가해준다.

```tsx
<Link to={`/rooms/${pk}`}>
```

room객체를 클릭하면 url이 해당 pk값이 포함되어 변경되는 것이 확인된다.
해당 url의 RoomDetail 페이지를 생성한다.
@src/routes/RoomDetail.tsx

```tsx
export default function RoomDetail() {
  return <h1>hello!!</h1>;
}
```

@src/router.tsx

```tsx
children: [
	... ,
	{
		path: "rooms/:roomPk",
		element: <RoomDetail />,
	},
	...
```

home화면에서 room객체를 선택하면 RoomDetail화면으로 이동된다.

useParams() 훅을 사용하여 url에 있는 모든 변수를 가져온다.
@src/routes/RoomDetail.tsx

```tsx
export default function RoomDetail() {
	const params = useParams();
	console.log(params);
	...
}
```

router에서 특정 pk를 전송하면서 해당 pk로 파라미터를 가져온다.
해당 파라미터로 fetch하는 함수를 생성한다.

데이터를 가져오기 전에 backend쪽에 작업이 필요하다.
...

api.ts에 임의의 pk로 함수를 생성한다.

```ts
export const getRoom = () =>
  instance.get(`rooms/11`).then((response) => response.data);
```

fetch함수로 roomdetail에서 값을 가져온다.
@routes/RoomDetail.tsx

```tsx
const { isLoading, data } = useQuery([`room:${roomPk}`], getRoom);
```

data변수에 backend model에 있는 데이터를 가져온다.

### 19.5 Devtools and Query Keys

tanstack의 devtool을 을 이용하여 query 변수가 어떻게 함수로 이동하는 알 수 있다.
devtool을 설치한다.

<https://tanstack.com/query/v4/docs/react/devtools>

    $ npm i @tanstack/react-query-devtools

root.tsx에 devtool을 import 한다.

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

...
	return (
		<Box>
			...
			<ReactQueryDevtools />
		</Box>
	...
```

app을 실행하면 브라우져 왼쪽 하단에 꽃모양 버튼이 생성된다. 클릭하면 캐시에 저장된 query를 확인 할 수 있다.

변수를 fetch함수로 보내는 방법을 적용해본다. room데이터를 받을때 2개의 array로 값을 받도족 적용하겠다.

```tsx
const { isLoading, data } = useQuery([`rooms`, roomPk], getRoom);
```

아직까지 getRoom에서 데이터를 받을 공간이 없어서 만들어 줘야한다. useQuery가 getRoom을 호출할때 매게변수를 보내준다.
@src/api.ts

```ts
export const getRoom = (someting) =>
	...
	console.log(someting)
```

```shell
	>>>:
	{
		queryKey: Array(2),
		pageParam: undefined,
		meta: undefined,
		queryKey: Array(2),
		0: "rooms",
		1: undefined,
		length: 2,
		...
```

queryKey 배열에 1번에 값을 찾지 못하고 있다.
@src/router path속성값이 rooms/:room_pk로 되어 있으면서 변수명이 일치하지 않아 찾지 못했었다. roomPk로 변경.

매개변수에서 queryKey값만 가져오도록 하겠다. 인수타입은 react-query에 가져와서 사용한다. 데이터 전송에 해당 queryKey의 pk를 보내준다.

```tsx
import { Quee.geryFunctionContext } from "@tanstack/react-query";

export const getRoom = ({queryKey}:QueryFunctionContext) =>
	instanct(`rooms/${queryKey[1]}`).then...
```

pk값을 변수에 저장하여 값의 의미를 남겨놓도록 적용하는 것이 좋다.

```tsx
const [_, roomPk] = queryKey;  // array의 길이가 2이다.
instance.get(`rooms/${roomPk}`).then...
```

적용 후 브라우져에서 확인을 하면 devtools의 Data Explorer에서 데이터를 확인 할 수 있다. #19.5 Devtools and Query Keys_1 참조

![#19.5 Devtools and Query Keys_1](https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2319.5%20Devtools%20and%20Query%20Keys_1.png)

### 19.6 Photos Grid

#### [2_Chakra]

타입을 정의한 파일을 따로 생성하여 모든 타입을 그 파일에 정의 하겠다. @src/type.d.ts를 생성하여 모든 type을 정의한다.

기존에 Home.tsx의 타입정의 코드를 삭제하고 type.d를 import하여 타입을 지정한다.

```ts
import { IRoomList } from "../type";

export default function Home() {
	... = useQuery<IRoomList[]>...
```

RoomDetail에도 적용해준다.

detail화면을 구성하는데 skeleton기능도 넣어준다.

```tsx
<Skeleton h={"43px"} w={"50%"} isLoaded={!isLoading}>
  <Heading>{data?.name}</Heading>
</Skeleton>
```

하단 별점, 지역 및 share, like 버튼도 생성한다.

detail화면에서 방 사진을 5개 가져온다.

```tsx
<Grid
	mt={4}
	h="60vh"
	templateRows={"1fr 1fr"}  // 탬플릿아이템이 1:1 비율로 생성
	templateColumns={"repeat(4, 1fr)"}
>
	{data?.photos.slice(0, 5).map((photo) => (  // slice(start, end): 아이템을 일부만 가져온다.
		<Box overflow={"hidden"} key={photo.pk}>
			<Image w={"100%"} h={"100%"} src={photo.file} />  // w,h=100%: templateRows 속성에 맞게 적용하기위해 사용
		...
```

detail화면에서 방 사진을 5개를 표시하는데 대표사진을 크게 하나 보여주고 오른쪽으로 남은 4개 사진을 합친 크기가 대표사진 크기와 같게 표현한다.
GridItem을 사용해준다.

```tsx
<GridItem
  colSpan={index === 0 ? 2 : 1} // column 길이
  rowSpan={index === 0 ? 2 : 1} // row 길이
  overflow={"hidden"}
  key={photo.pk}
>
  <Image objectFit={"cover"} w={"100%"} h={"100%"} src={photo.file} />
</GridItem>
```

사진 폼 끝부분을 rounded준다.

```tsx
<Grid
	...
	rounded="lg"
	overflow={"hidden"}
>
```

room img도 skeleton기능을 구현한다. 데이터가 들어오기전에 생성되어야하기때문에 임의 list를 만들어서 skeleton을 생성한다.

```tsx
{[0, 1, 2, 3, 4].map((index) => (
	<GridItem
		...
		key={index}
	>
		<Skeleton h={"100%"} w={"100%"} isLoaded={!isLoading}>
			<Image
				...
				src={data?.photos[index].file}
			/>
		...
```

### 19.7 Reviews

#### [2_Chakra]

room img 및에 방 제목과 toilet, room 개수를 표시하는 칸을 생성한다.

```tsx
// 이미지는 가로정렬
<HStack mt={10}>
  // 나머지 데이터는 세로 정렬
  <VStack>
    <Heading fontSize={"2xl"}>House Hosted by {data?.owner.name}</Heading>
    // "flex-start" 속성을 사용하지 않으면 중간에서 시작한다.
    <HStack justifyContent={"flex-start"} w={"100%"}>
      <Text>
        {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"} // 두개이상일경우
        "s"를 붙여준다.
      </Text>
      <Text>•</Text>
      <Text>
        {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
      </Text>
    </HStack>
  </VStack>
</HStack>
```

Avatar 컴포넌트를 사용하여 avatar를 표시해준다.

```tsx
<HStack ...>
	...
	//이미지를 로드해오지 못할 경우 name 속성을 표기해준다.
	<Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
...
```

skeleton을 구성한다. headgin과 Text를 감싸준다.

```tsx
<HStack ...>
	<VStack alignItems={"flex-start"}>
		<Skeleton h={"29px"} isLoaded={!isLoading}>
			...
		</Skeleton>
		<Skeleton ...>
			...
```

이제 이 review페이지를 위한 fetch코드를 추가한다.

@src/api. 기존 getRooom에서 reviews로 가는 것 말고는 같다.

```tsx
...
return instance
	.get(`rooms/${roomPk}/reviews`)
	...
};
```

@src/routes/RoomDetail

```tsx
// 이미 변수명이 있기때문에 변경
const { isLoading: reviewsIsLoading, data: reviewsData } = useQuery(
  [`rooms`, roomPk, `reviews`],
  getRoomReviews
);
```

review데이터를 roomDetail 하단에 구현한다.

```tsx
<Box mt={10}>
  <Heading fontSize={"2xl"}>
    <HStack>
      <FaStar />
      <Text>{data?.rating}</Text>
    </HStack>
  </Heading>
</Box>
```

reviews의 수를 표시할려고 한다. reviews.length를 사용하기 위해서는 reviews의 타입이 정의 되어야 한다.

@src/type.d.ts

```ts
export interface IReview {
	...
}
```

@src/routes/roomDetail.tsx

```tsx
... = useQeury<IReview>(...)
```

### 19.8 Conclusions

Review칸을 구성해본다. 화면에 2개 리뷰 컬럼이 놓아지고 정렬되는 방식으로 구현한다.

```tsx
<Grid gap={5} templateColumns={"1fr 1fr"}>
	{reviewsData?.map((review, index) => (
		<VStack alignItems={"flex-start"} key={index}>
			...
```

컬럼을 구성한다.

grid가 커서 컬럼간의 간격이 넓다. grid를 container 컴포넌트에 넣어준다.

```tsx
<Container MarginX="none">  // 가로정렬이 가운데로 되어 있다.
	<Grid ...>
	...
```

## 20 Authentication

### 20.0 useUser

header에서 authentication을 알 수 있도록 구현한다. hook을 만들어서 로그인 여부를 알려주도록 하겠다.

fetcher function을 생성한다.
@src/api.ts

```ts
export const getMe = () =>
  instance.get(`user/me`).then((response) => response.data);
```

src/lib 폴더를 생성한다. useUser hook을 생성해준다.

@src/lib/useUser.ts, error까지 사용해준다.

```ts
export default function useUser() {
  const { isLoading, data, error } = useQuery(["me"], getMe);
  console.log(error);
  return;
}
```

@src/components/header 에 useUser훅을 추가해준다.

```tsx
useUser();
```

header 컴포넌트는 어디에서든 호출이 되니 아무 페이지에서 확인 할 수 있다. #20.0 useUser_1 참조

![#20.0 useUser_1](https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2320.0%20useUser_1.png)

error대신 isError를 사용하겠다. isError는 error여부에 따라 boolean값을 반환한다.

return값에 object를 반환하겠다. key와 value값이 같다면 변수명처럼 보내줄 수 있다.

```tsx
isLoading,  // <- isLoading: isLoading,
user: data,
isLoggedIn: !isError,  // isError가 false일때 에러가 없기때문에 로그인이 되었다고 판단.
```

Header에 user로그인이 되었다면 login sign up버튼을 안보이도록 적용한다.

```tsx
{
  !userLoading && !isLoggedIn ? (
    <>
      {" "}
      // fragment. 하나의 엘리멘트만 전송이 가능해서 묶어준다.
      <Button onClick={onLoginOpen}>Log in</Button>
      <LightMode>
        <Button onClick={onSignUpOpen} colorScheme={"red"}>
          Sign up
        </Button>
      </LightMode>
    </>
  ) : (
    <Avatar />
  );
}
```

테스트를 해보면 error가 발생하기 전까지 아바타 이모티콘이 나오다가 login버튼이 나온다. react는 기본으로 fetch를 실패해도 3번을 시도한다.
시도하는 동안 로그인버튼 대신 아바타가 보인다. 로그인 시도가 아닌 유저 데이터를 가져오는 것은 재시도를 하지 않도록 적용하기로 하겠다.

```tsx
useQuery(..., {
	retry: false,
})
```

이제 바로 로그인 버튼이 나오게 된다.

로딩하는 동안 Avatar 모양이 나오지 않다록 하기 위해서 if문을 변경한다.

```tsx
{!userLoading ? (
	!isLoggedIn ? (
		<>
			...
		</>
	) : (
		...
	)
) : null
```

적용 후 python서버에 로그인을 해도 로그인정보를 가져오지 못한다. 해당부분 수정을 진행하도록 하겠다.

### 20.1 Credentials

session authentication은 cookie애 의해 작동된다. 로그인을 하면 Django는 session Object를 database에 생성한다.
session은 pk와 user데이터를 갖고 있다. Django는 session pk를 cookie에 담아서 보내준다.
#20.1 Credentials_1 (cookie Session Id).png 참조

![#20.1 Credentials_1 (cookie Session Id).png](<https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2320.1%20Credentials_1%20(cookie%20Session%20Id).png>)

# ! 쿠키, 캐시, 세션, 로컬 스로테지

- local storage: local에 저장되는 데이터이다. 계속 저장이 된다. 용량의 제한도 없다.

- cookie: 요청한 데이터를 서버에서 보내주고 local에 저장해둔다. 쿠키는 데이터 요청시 매번 보내진다.
  수정사항이 있다면 서버에서 변경된 쿠키를 보내준다.

  > [LocalStorage, SessionStorage, Cookie의 차이점 (velog)](https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)

- cashe: 웹 페이지 요소를 저장한다. 웹페이지를 빨리 렌더링하기 위해 도와준다. 오디오와 비디오 파일을 저장할 수 있다.

- session: 서버에 데이터가 저장된다. cookie는 텍스트형식, session은 object형식으로 저장된다.(db니까..)
  브라우져 종료시 데이터는 삭제 된다.
  > [쿠키(Cookie), 세션(Session) 특징 및 차이 (tistory)](https://hahahoho5915.tistory.com/32)

Django가 쓰는 url과 react가 쓰는 url이 다르기때문에 장고서버에서 react url로 쿠키가 전송되지 않는다. (도메인이 같지 않다.)
react페이지를 도메인을 갖게 적용을 하면 데이터를 가져올 수 없다. Django에서는 fetch가 가능한 도메인을 적용해야한다.

cookie를 준 도메인과 fetch를 진행하는 도메인이 일치해야한다.
fetch가능한 도메인을 변경해준다. -backand
...

브라우져 url창에 localhost를 대신해서 ip번호를 넣어서 검색을 한다.
Django에 설정을 추가해주면 아직 로그인을 확인하지는 못하지만 cookie에 sessionId 데이터가 추가된다.

브라우져에 의해 만들어진 요청은 자동으로 Django에 cookie를 보내준다.
react페이지는 fetch를 하여 데이터를 가져오기 때문에 javascript에 cookie를 포함시키라고 설명을 해야한다.

@src/api.ts

```ts
const instance = axios.create({
	... ,
	withCredentials: true,
});
```

적용 후 송신 에러가 발생한다.

```shell
Access to XMLHttpRequest at 'http://127.0.0.1:8000/api/v2/rooms/'
from origin 'http://127.0.0.1:3000' has been blocked by CORS policy:
The value of the 'Access-Control-Allow-Credentials' header in the
response is '' which must be 'true' when the request's credentials
mode is 'include'. The credentials mode of requests initiated by
the XMLHttpRequest is controlled by the withCredentials attribute.
```

Django에서 credential을 받도록 적용해야한다.

...

Django 적용 후 react페이지에서 로그인확인이 가능하다.

# ! Django와 react를 사용하는 브라우져 일치시켜야함

두 페이지를 사용하는 브라우져가 같아야 인증에 문제가 발생하지 않는다고 한다.
내 프로젝트 작업을 진행하는 동안에는 문제가 발생하지 않았다.

### 20.3 Log Out

로그아웃 기능을 구현한다. 우선 menu, menubutton 컴포넌트로 header의 avatar을 감싸준다.

@src/components/header.tsx

```tsx
<Menu>
	<MenuButton>
		<Avatar ... />
	</MenuButton>
	<MenuList>
		<MenuItem>Log out</MenuItem>
	</MenuList>
</Menu>
```

구현 후 Avatar를 클릭하면 리스트처럼 하단에 Log out이 나온다.

(Django서버 users/urls에 'log-out'이 생성되어 있다. post()로 logout기능이 구현되어 있다.)
버튼 클릭시 Django서버에 로그아웃 프로토콜을 보내면 된다.

@src/api.ts

```ts
export const logOut = () =>
  instance.post("users/log-out").then((response) => response.data);
```

@src/components/Header.tsx

```tsx
<MenuItem onclick={logOut}>...</MenuItem>
```

logOut 데이터를 담는 onLogOut()를 생성해준다.

```tsx
const onLogOut = async () => {
  const data = await logOut();
  console.log(data);
};
```

로그아웃을 테스트해 본다.

# ! console에 요청 실패 오류메세지

console에 요청 실패 오류메세지가 발생한다고 하는데 본인이 테스트를 진행하면 오류가 발생하지 않음.
(CSRF Failed 이 발생한다고 한다.)

오류가 발행하는 원인이 정리된 게시글이다.
<https://han-py.tistory.com/352>
다음 강의에 요청실패하는 원인과 해결을 알려준다고 하니 대기.

!! 추후에 나오지만 basic인증기능을 사용하여 로그인이 되어있어서 오류가 발생하지 않았던 거다.
이전에 backend에서 테스트용으로 사용했던 기능을 삭제하지 않고 냅뒀던것이 영향을 미친것.
이제는 어디서도 basic인증기능을 사용하지 않기때문에 인증오류가 발생하는 것은 당연하다.

Toast hook을 사용하여 authentication을 알려주는 기능을 구현한다.
<https://chakra-ui.com/docs/components/toast>

```tsx
const onLogOut = async () => {
  toast({
    title: "Good bye!!",
    description: "Log out Completed.",
    status: "success", // toast body색상, 아이콘이 변경된다.
    isClosable: true, // 종료 아이콘이 생성된다.
    duration: 6000, // 6초 뒤에 사라진다.
  });
};
```

toast update()를 통해 toast변경이 가능하다. 임의로 딜레이 시간을 줘서 테스트를 진행한다.

```tsx
const toastId = toast({
	...
})

setTimeout(() => {
	toast.update(toastId, {
		...  // 변경될 속성들
	})
}, 5000)
```

# ! MenuButton의 Avatar를 클릭시 css 경고 메세지

MenuButton의 Avatar를 클릭시 css 경고 메세지가 발생한다.

```shell
>>>: createPopper.js:110 Popper: CSS "margin" styles cannot be used
to apply padding between the popper and its reference element or
boundary. To replicate margin, use the `offset` modifier, as well
as the `padding` option in the `preventOverflow` and `flip` modifiers.
```

HStack대신에 Flex를 사용하여 해결이 가능하다.
[Airbnb clon강의 댓글의 깃허브 URL](https://github.com/kjh910/airbnb-clone/blob/1a1db114aba436790eab8e166454ca3c8bc3a8f2/airbnb-clone-frontend/app/src/components/organisms/header/header.tsx#L67)

### 20.4 CSRF

Django는 어떠한 사이트에서든 post 요청을 신뢰하지 않으며 공격을 차단한다.
CSRF는 cross-site request forgery로써 해커가 사용하는 공격의 일종으로 해커의 사이트로부터 post요청을 보내도록 속이는 방법이다.
credential를 이용하여 정보를 훔치는 목적으로 사용된다.

[CSRF 공격이란? 그리고 CSRF 방어 방법 (itstory)](https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95)

Django에 post가능한 url을 추가해준다.

...

Django에 추가를 해주면 기존에 발생하던 오류가 변경된다. post요청을 보낼때 CSRF token을 같이 보내줘야 한다.
보안 기능이므로 보내주는 것을 구현한다.(cookie에 csrftoken이 있다.) 기능구현을 위해 js-cookie를 설치한다.
<https://www.npmjs.com/package/js-cookie>

```shell
$ npm i js-cookie  # ! 설치 다 안됨.
```

사용을 위해 import를 하면 타입을 알 수 없기때문에 설치할 때 속성을 추가해달라는 ts오류가 발생한다.

```tsx
import Cookie from "js-cookie";
```

```shell
>>>: Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration
(.d.ts) file containing `declare module 'js-cookie';`
```

제시해준 명령어로 다시 설치해준다.

    $ npm i --save-dev @types/js-cookie

logOut에 token을 담아주도록 적용한다.

@Header.tsx

```tsx
export const logOut = () =>
  instance
    // post두번째 자리에는 보내줄 data를 지정한다.
    .post(`users/log-out`, null, {
      // 앱은 CSRF 토큰을 획득하기 위해 헤더에 X-CSRF-Token: fetch를 포함하여야 한다.
      headers: { "X-CSRFToken": Cookie.get("csfrtoken") },
    })
    .then((response) => response.data);
```

<https://binchoo.tistory.com/46>

이제 로그아웃을 클릭하면 로그아웃 기능이 구현이 된다. Django admin에서도 로그아웃이 된다.
하지만 로그아웃되면서 refetch기능이 없어서 새로고침을 하지 않으면 페이지가 로그인된 상태로 계속 유지가 된다.

queryClient에는 우리가 fetch한 모든 query와 data가 있다.
query client를 사용하여 log out시 refetch기능을 구현하도록 하겠다.

@src/components/header.tsx

```tsx
const queryClient = useQueryClient();
const onLogOut = async () => {
	const toastId = toast({
		...
	});
	await logOut();
	// @src/lib/useUser 에 query를 생성할때 쿼리명을 me로 지정하였다.
	queryClient.refetchQueries(["me"]);  // refetch할 query명을 넣어준다.
	toast.update(toastId, {
		...
	});
};
```

# ! react 로그인화면 계속 유지

react페이지는 로그아웃을 진행해도 페이지 변화가 발생하지 않는다. Django 페이지에 가면 로그아웃이 됨.
로그아웃 상태에서 !isLoggedIn를 console에 출력하면 false가 나옴.
? 로그인이 안되어있어도 user데이터를 가져오는데 에러가 발생 안한다. 어느 유저로 로그아웃을 했든 gh의 아이디정보가 나온다.

이전에 CSRF Failed 메세지도 발생하지 않고 가져올 user 데이터도 없는데 useUser query에서 에러가 발생하지 않는다. ??
django와 react 여는 브라우져가 달라서 발생하는 오류 일까.
브라우져의 탭을 전체 종료 후 다시 실행을 하니 유저 데이터가 나오지 않는다.

!!! users/me에 접근할때 브라우져에서 로그인창이 뜬다. 해당 창에서 로그인했던 데이터가 계속 나온거같다.
예전에 로그인창이 뜨길래 로그인한적이 있다. gh 아이디로 로그인을 했었다. 해당 정보가 어딘가 남아서 계속 나온듯 싶다.
react페이지에서 로그인창이 사라지지 않고 계속 나온다. 해당부분 수정을 진행해야한다.

basic인증 기능을 사용하여 발생한 기능이다.
로그인 창은 #20.4 CSRF_1 (로그인 창) 참조.

![#20.4 CSRF_1](<https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2320.4%20CSRF_1%20(로그인%20창).png>)

Django에서 로그인 후 react페이지에서 log out 테스트 진행.

# ! 이제서야 CSRF오류가 발생

테스트를 위해 Django의 CSRF_TRUSTED_ORIGINS 설정을 주석처리 했었다.
원복진행 후 로그 아웃하니 정상 작동한다. 로그인 창은 계속 뜬다.

# 오류해결 정리

처음 react페이지를 열었을 때 로그인 창이 떳던 이유는 Django에 settings의 설정때문이였다.
인증 클래스에 BasicAuthentication 기능이 추가되어 있어서 로그인창이 떴다. 해당 기능을 지우면 로그인창이 뜨지 않는다.(모든 오류의 원흉)

CSRF 오류가 발생하지 않았던 이유는 로그인창에서 등록한 유저 정보가 있어서
Django에 user정보를 요구를 하지 않아 오류가 발생하지 않았다.

backend 유저 인증 관련 정보는 #15 Authentication 강의를 참조하자.

이제 로그아웃 기능이 정상 작동한다.

### 20.5 Github log in

깃허브 로그인 기능을 구현하겠다.

OAuth App
<https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps>

user가 github 로그인을 클릭하면 github로 이동하며 사용자의 개인정보에 접근을 동의하는지 허락을 구한다.
user가 허락한다면 github는 유저를 우리가 보내달라고 요청한 url로 토큰과 함께 보내준다.

이 토큰을 Django를 이용해 backend로 보내줘야한다. 그리고 나서 Django는 Github api에 토큰과 함께 요청을 보낸다.
토큰을 받은 Github api는 유저 정보를 보내준다. 그러면 로그인 프로세스는 마무리된다.

해당 기능을 구현하기 위해서 새로운 app를 생성한다. 하단 url에 이동하여 github app을 생성한다.
<https://github.com/settings/applications/new>

    Application name: airbnb clone
    Homepage URL: http://127.0.0.1:3000/api/v2/

    // github가 사용자 정보 제공 동의를 구한다음 redirect시키는 url이다.
    Authorization callback URL: http://127.0.0.1:3000/api/v2/social/github

app을 생성하면 app정보가 나온며 client id가 있다. <https://github.com/settings/applications/2101837>

social login 모달에 기능구현을 한다.

```tsx
<Button
	as={"a"}  // html 태그로 변환이 가능하다. anker로 변환한다.
	// anker 속성이 사용가능하다.
	href={"https://github.com/login/oauth/authorize"}  // 유저를 보내야할 url이다. github OAuth 페이지 설명 참조
	leftIcon={<FaGithub />}
	...
>
	Continue with Github
</Button>
```

github app에 유저를 보낼때 우리의 client_id 파라미터를 같이 보내줘야한다.

```tsx
<Button
	...
	href={"...?client_id=f61c955f466d92d1cac9"}
>
```

해당 기능을 구현하면 github login버튼을 클릭하면 github 권한 허가 요청페이지로 이동한다.

#20.5 Github Log In_1 (github 정보 제공 허가).png 참조.
![#20.5 Github Log In_1 (github 정보 제공 허가).png](<https://raw.githubusercontent.com/byeon2261/airbnb-clone-frontend/main/__img/%2320.5%20Github%20Log%20In_1%20(github%20%EC%A0%95%EB%B3%B4%20%EC%A0%9C%EA%B3%B5%20%ED%97%88%EA%B0%80).png>)

앱 이름과 정보를 제공할 유저의 정보가 나온다. 아직 승인을 누르면 안된다.

기본 셋팅은 공개된 정보만 가져올 수 있다.
사용자가 우리 웹에서 필요한 데이터를 비공개로 해났을 수 있으니 비공개여도 가져와야할 데이터를 정의하겠다.

```tsx
<Button
	...
	href={"...?...&scope=read:user,user:email"}  // scope는 사용자에게 얻고 싶은 정보 목록이다.
>
```

Scopes for OAuth Apps.
<https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps>

적용 후 github login버튼을 클릭하면 사용자에게 요구하는 데이터가 변경된다.
허용을 클릭하면 github app이 사용자를 기억하며 데이터 요구페이지는 더이상 뜨지 않는다.
다음 로그인시 바로 Authorization callback URL로 보내준다.

클릭을 하면 Authorization callback URL페이지로 이동이 되며 code파라미터도 같이 보내준다.
해당 코드가 Django에 보내야 하는 코드이다. 브라우져는 위험하니 backend로 보내는 거다.

### 20.6 Github Code

github 로그인을 위한 페이지를 생성한다.

@src/routes/GithubConfirm.tsx 생성

```tsx
export default function GithubConfirm() {
  return (
    <VStack bg={"gray.100"} justifyContent={"center"} minH="100vh">
      <Heading>Processing log in...</Heading>
      <Text>Don't go anything.</Text>
    </VStack>
  );
}
```

notfound페이지를 가져와서 일부 수정한다.

spinner를 사용하여 로딩중임으로 표현하겠다.
<https://chakra-ui.com/docs/components/spinner>

```tsx
...
<Spinner size="xl" />
```

컴포넌트를 router에 연결을 해준다.

@src/router.tsx

```tsx
...
{
	path: "social",
	children: [
		{
			path: "github",
			element: <GithubConfirm />,
		},
	],
},
```

kakao로그인도 나중에 추가하므로 children 구성으로 구현한다.
브라우져에서 해당 url로 이동을 하면 화면이 나온다.

해당 페이지에 도착하게 되면 우리는 github api에서 받은 코드를 backend로 전송한다.

@src/routes/GithubConfirm.tsx

```tsx
const location = useLocation(); // 우리가 있는 곳을 알려준다.
useEffect(() => {
  console.log(location);
});
```

```shell
>>>:
	hash: ""
	key: "default"
	pathname: "/api/v2/social/github"
	search: "?code=15ac72cf76f174002643"
	state: null
```

location.search 내 parameter가 있다.

url에서 데이터를 가져올 수 있는 URLSearchParams class가 있다.

```tsx
const { search } = useLocation(); // location에서 seacrh만 가져온다.
const user = new URLSearchParams(search);
console.log(user.get("code"));
```

```shell
>>>: 15ac72cf76f174002643
```

이제 해당 코드를 전송할 api function을 생성해준다.

@src.api.ts

```ts
export const githubLogin = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.status);
```

해당 함수를 이용하여 데이터를 전송해준다.

@src/routes/GithubConfirm.tsx

```tsx
const confirmLogin = async () => {
  const params = new URLSearchParams(search);
  const code = params.get("code");
  if (code) {
    // code가 null일 수 있다며 오류가 발생한다. 값이 오는것이 확실하더라도 사용해야한다.
    await githubLogin(code);
  }
};
useEffect(() => {
  confirmLogin();
}, []);
```

이제 backend에 code를 보내준다. 아직 Django에 users/github페이지가 없기때문에 react페이지 콘솔에서 404 오류가 발생한다.

Django에서 해당 페이지를 생성한다 후 github api와 통신을 한다.

...

### 20.7 Access Token

backend에서 데이터를 github api통신 셋팅

### 20.8 Emails

...

post요청이 두번가면서 두번째에는 bad requests오류가 발생한다.
react는 develop모드에서 screen을 두번 렌더링한다. 메모리 누수나 버그를 잡기 위해서 그런거다.
index에 strickmode를 제거해준다.

    <React.StrictMode> -> null

backend에서 로그인을 진행한다 ...

이제 frontend에서 status code와 response를 요청하도록 한다

@src/routes/GithubConfirm

    // status(Num)를 받는다
    // 로그인이 성공하였다면 toast로 로그인되었다고 알려준다.
    // 리패치를 진행
    // 홈으로 이동시킴

유저 로그인 기능이 구현되었다.

### 20.9 Kakao Talk App

kakao 로그인 기능을 구현한다. 카카오 개발자 사이트에서 로그인 앱 생성을 진행한다.

    카카오디벨로퍼스 회원가입 진행
    로그인 앱 생성

<https://developers.kakao.com/console/app>

해당 프로젝트 앱 정보

<https://developers.kakao.com/console/app/862612>

제품 설정/카카오 로그인에서 활성화를 진행한다.

redirect URL을 등록한다.

    http://127.0.0.1:3000/api/v2/social/kakao

제품 설정/카카오 로그인/동의 항목에서 유저에서 받아올 데이터를 설정한다.

    닉네임, 프로필 사진: 필수 사항
    카카오계정(이메일): 선택 사항 (필수 사항은 선택할 수 없다.)

### 20.10 Kakao Talk Auth

카카오 인가 코드(토큰)을 받기 위한 url로 이동을 시켜준다.

<https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaologin>

@src/routes/KakaoConfirm

    export default function KakaoConfirm() {
        const { search } = useLocation();
        const confirmLogin = async () => {
            const params = new URLSearchParams(search);
            const code = params.get("code");
            if (code) {
                await kakaoLogin(code);
            }
        };
        useEffect(() => {
            confirmLogin();
        });
        return ...

@src/api

    export const kakaoLogin = (code: string) =>
        instance
            .post(
                "users/kakao",
                { code },
                {
                    headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
                }
            )
            .then((response) => response.data);

url과 함수, 컴포넌트 명을 제외하고는 github로그인 로직과 일치한다.

소셜 로그인에 파라미터를 정리하여 관리하도록 로직을 변경한다.

    const kakaoParams = {
        client_id: "f4fdce8bfd733f3368f97c47a87266b6",
        redirect_uri: "http://127.0.0.1:3000/api/v2/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();
    console.log(params);

    >>>: client_id=f4fdce8bfd733f3368f97c47a87266b6&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fv2%2Fsocial%2Fkakao&response_type=code

해당 데이터를 URL에 파라미터를 넣어준다.

    <Button
        as={"a"}
        href={`/oauth/authorize?${params}`}
        ...
    >
        Continue with Kakao
    </Button>

kakao login버튼을 클릭하면 정보 제공 동의 화면으로 이동이 된다.

정보제공을 동의하면 code를 반환해준다. 해당 코드를 이번에도 Django로 보내서 kakao에 유저정보를 요청할 거다.

### 20.11 Kakao Log In

...backend에서 유저 데이터를 생성 및 로그인 로직을 완성하였다.

# ! kakao로그인 성공시 response code 403발생

    kakao로그인 성공이 되었음에도 유저 로그인 인식이 늦게 이뤄짐.
    또는 화면을 변경하고 나서 refetch가 되면서 로그인 된걸 인식함.
    back-end쪽에 print()가 refetch가 될때야 실행이됨. 로그인 시도시 back-end쪽으로 로직이 오지않는 것같음.

    !! api.ts에 instance부분에 return값이 잘못되었음.
        instance.post(...).then((response) => response.data)

        response.data -> response.status

    return값이 잘못되었다고 post요청이 아예안간것 같이 작동된것은 의아스럽다.

### 20.12 Log In Form

login form은 완성하도록 하겠다. username과 password를 state에 저장 기능을 구현한다.

react hook form을 사용하면 react로 validate하고 form만드는 것을 가능하게 한다.

input의 value와 state의 value를 연결하는 작업을 진행한다.

@components/LoginModal

    const [username, onChangeUsername] = useState("");
    ...
    const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(event.currentTarget);
    };
    ...
        <Input
            name="username"  // name 값을 통해 변경되는 주체를 파악한다.
            onChange={onChange}
            value={username}
            ...
        />
    ...

    >>>: <input name="username" placeholder="Username" class="chakra-input css-1adv6i9">
    ! value값이 출력에 나오지는 않지만 존재한다.

값이 입력될 때마다 onChange가 작동된다. 아직 state값이 변경되지 않기때문에 Input창에 입력이 되지 않는다.

Input 입력값을 state에 넣어주도록 한다.

    const onChange = (event: ...) => {
        const { name, value } = event.currentTarget;
        if (name === "username") {
            onChangeUsername(value);
        } else if (name === "password") {
            onChangePassword(value);
        }
    }

Input 입력값이 state에 저장되면서 Input에 변경값이 나온다.

이제 log in버튼 기능을 작성한다. form으로 username, password, login을 감싼다. modalbody로 감싸져 있으며 기본 속성은 div이며 변경이 가능하다.

    <ModalBody as={"form"}>
        ...
            <Input
                ...
                type="password"  // 비밀번호 입력처럼 입력값이 별표로 표시된다.
            >
        ...
        <Button
            type="submit"  // 값이 제출되며 화면이 새로고침 된다.
        >

화면 새로고침 기능을 삭제하기 위해 함수를 사용하여 기능을 구현한다.

    const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    ...
        <ModalBody as={"form"} onSubmit={onSubmit}>
            ...

ModalBody는 기본 설정이 div이기 때문에 onSubmit을 사용하면 속성 오류때문에 오류가 발생한다.
두가지 방법이 있는데 onSubmit 제네럴의 타입을 변경하던지,ModalBody가 form이라고 알려줘야한다.

    1. <HTMLFormElement>  ->  <HTMLDivElement>
    2. onSubmit={onSubmit}  ->  onSubmit={onSubmit as any}

username과 password는 필수 값이기 때문에 required값을 부여한다.

지금까지 username과 password입력을 위한 기능 구현이였다. 나중에 validate도 진행하면서 error를 위한 코드도 작성되어야한다.
그렇다면 if문을 이용하여 더 길어지는 코드를 작성 및 관리해야한다. react hook form을 이용하여 간단하게 적용해본다.

### 20.13 React hook form

react hook form을 사용하면 form데이터 관리 로직이 매우 줄어든다. 설치를 진행한다.

    $ npm i react-hook-form

loginmodal에 해당 hook을 import하여 구연한다.

    import { useForm } from "react-hook-form";
    ...
        const { register } = useForm();  // register: input에 값을 등록하는데 사용된다.

input의 name,onchange, value를 삭제하고 register함수를 구현한다. ModalBody의 onSubmit도 삭제한다.

    console.log(register("great"))
    ...
        <Input
            ...
            {...register("[name으로 사용될 값]")}  // ...는 실제 입력되는 텍스트이다.
        >

    >>>: name: "great"
         onBlur: async event => {...}
         onChange: async event => {...}
         ref: ref => {…}

...연산자를 통해 register함수가 실행되면서 Input컴포넌트 속성에 4가지가 추가되는 것이다.

useForm에서 watch를 가져와 사용을 하면 Input값이 변경될 때마다 watch값에 업데이트가 된다.

    const { register, watch } = useForm()
    console.log(watch())

Login Form의 Input을 입력할때마다 console에 입력되어 있는 값들이 출력된다.

    >>>: {username: '...', password: '...'}

register에 등록한 value가 key로 등록되어 저장된다. 물론 register에 등록한 input값만 가져온다.
useForm의 register,watch만으로 state설정 및 값 등록, 불러오기가 가능해졌다.

data검증을 위해 handleSubmit()를 가져오도록 하겠다. event.preventDefault()를 기본적으로 제공해준다.
handlesubmit()를 기본 기능을 구현해본다.

    const submit = () => {
        console.log("submitted!");
    };
    ...
        <ModalBody ... onSubmit={handleSubmit(submit)}>

onSubit안에 submit()만을 넣게 되면 화면이 새로고침되면서 console값을 볼 수 없다.
handleSubmit()안에 submit을 넣게되면 새로고침되지않고 onSubmit을 할 수 있다.

onSubmit에 구현을 진행한다.

    interface IUser {
        username: string;
        password: string;
    }
    ...
        const { ... } = useForm<IUser>();  // IUser type
        const onSubmit = (data: IUser) => {  // IUser type
            console.log(data);
        };

    >>>: {username: '...', password: '...'}

key의 type을 지정한다.

현재 Input은 validate기능을 위해 html required 속성을 부여했다.
해당 속성은 html이기 때문에 브라우져 검증창에서 삭제하여 사용도 가능하다.
required를 브라우져에서 삭제한 후 빈칸으로 login버튼을 클릭해도 submit이 진행된다.

우리는 html만 믿을게 아니라 js, react-hook-form의 validate가능도 필요하다.
register에 값이 들어오는 것도 검증이 필요하기때문에 required를 부여하도록 한다.

    <Input
        {...register("[key]", {  // 다시 강조하지만 register앞에 ...는 실제 텍스트이다.
            required: true,
        })}
    >

validate이 진행되며 오류가 있는 input으로 입력할 수 있도록 포커스 된다.
좋은 UX(사용자경험)이며 구현 및 관리할 필요가 없어 편리하다.

required에 true대신에 text를 넣어서 error표시를 변경할 수 있다.

    const { ... formState: {errors} } = useForm<IUser>();  // formState.errors를 가져온다.
    console.log(errors);
    ...
        {...register("username", {
            required: "Please input your username",
        })}

    >>>: {username: {
            message: "Please input your username",
            ref: input.chakra-input.css-...,
            type: "required",
        }, password: {
            ...
        }}

해당 콘솔값을 보기 위해서는 input의 required를 삭제해야 console값이 출력된다.

해당 오류 메세지를 form안에 추가해준다. 해당 테스트도 input의 required를 삭제 후 진행한다.

    <InputGroup>
        ...
        <Text ...>
            {errors.username?.message}  // password도 동일하게 적용해준다.
        </Text>
    </InputGroup>

onSubmit이전에는 Text가 보이지 않다가 오류가 발생하면 Input옆에 message가 출력된다.
(그렇게 예쁘게 출력되지는 않는다. 외국사이트에서는 봤던거 같다. )

#20.13 React Hook Form_1 (register required text) 참조
![#20.13 React Hook Form_1 (register required text)]()

required text출력대신 error가 발생한 input을 표시해줄수 있다.

    <Input
        isInvailed={Boolean(errors.username?.message)}
    >

에러가 발생하면 해당 Input 테두리가 red.500색으로 변경된다.
해당 기능이 안좋은 점이 에러가 난 Input의 테두리는 변경되지만
해당 Input으로 포거스가 옮겨지면서 focus된 input테두리 색으로 변경된다.
물론 focus를 옮기면 보이긴한다.

### 20.14 useMutation

API에다 데이터를 보내주는 것을 mutation이라고 한다.
지금까지는 query를 사용하여 데이터를 가져오는 기능만 구현하였다.
예를 들어 로그아웃 기능으로는 로그아웃 신호를 받으면 백엔드에 logout기능을 실행시키는 것 밖에 없었다.
로그인 기능은 검증기능이 필요하기때문에 useMutation기능을 사용하여 로그인 구조를 설계한다.

우선 login api를 생성한다. username과 password를 object로 받는다.
@api.ts

    export interface IUsernameLoginVariables {
      username: string;
      password: string;
    }

    export const usernameLogin = ({
      username,
      password,
    }: IUsernameLoginVariables) =>
      instance
        .post(
          "users/log-in",
          { username, password },
          {
            headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
          }
        )
        .then((response) => response.data);

Django에서는 data를 ok, error 두가지중 하나를 보내준다.(로그인 성공, 실패)
두 repsonse의 type도 정의 해준다.

    export interface IUsernameLoginSuccess {
      ok: string;
    }
    export interface IUsernameLoginError {
      error: string;
    }

reponse값을 사용할때 해당 타입을 사용하면 된다.

해당 api를 이용하여 mutatiion을 구현한다.

@src/components/LoginModal.tsx

    const mutation = useMutation(usernameLogin, {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        queryClient.refetchQueries(["me"]);  // refetch를 진행해야 화면에서 로그인이 표시된다.(로그아웃과 같다.)
        toast({
          title: "Welcome back!",
          status: "success",
        });
        onClose();  // 로그인이 된다고 모달창이 자동으로 닫히지 않는다. 닫아주자
      },
      onError: (error) => {
        ...  // 다음시간에 error를 구현한다.
      },
    });
    const onSubmit = ({ username, password }: IUser) => {
      mutation.mutate({ username, password });
    };

mutate의 isloading을 사용하여 props의 isloading을 구현할 수 있다.

    <Button
      isLoading={mutation.isLoading}
      ...
    >

로딩중에 버튼에서 로딩표시가 생긴다.(spinner, 시계방향으로 원모양이 뺑글뺑글 회전한다. )

### 20.15 Recap

로그인 오류시 오류 메세지를 나오도록 구현하겠다. useMutation을 사용하여 쉽게 구현이 가능하다.

@src/componenets/LoginModal

    {mutation.error ? (
      <Text color={"red.500"} textAlign={"center"} fontSize={"sm"}>
        username or password is wrong
      </Text>
    ) : null}

로그인 오류 기능을 구현하지만 데이터를 잘못입력해도 로그인 성공 toast가 나온다. (로그인은 안된다)
백엔드부분에 response데이터 부분을 수정 진행...

backend에서 성공여부에 따라 response에 http프로토콜을 보내주도록 적용했다.
해당 프로토콜로 로그인 성공여부를 확인을 하니 api부분에서는 response.data를 갖고오지 않아도 된다.

@api.ts

    export const usernameLogin = (...) => instance.post(...);

로그인을 하면 로그인 정보가 모달창 input에 남아 있다. input을 reset하는 기능을 구현한다.

    const {
      ...,
      reset,
    } = useForm<IUser>();
    ...
      reset()

만약 값을 변경하고 싶다면 setValue()를 사용하면된다.

    const {
      ...,
      setValue,
    } = useForm<IUser>();
    ...
      setValue("username", "I Love You.")  // (변경할 대상, 변경할 값)

로그아웃부분을 mutation기능을 사용하여 로직을 변경해본다.

    const toastId = useRef<ToastId>();  // useRef(): state에 넣지않고 컴포넌트내에서 데이터를 관리할때 사용된다.
    const mutation = useMutation(logOut, {
      onMutate: () => {
        toastId.current = toast({  // ref.current를 사용하여 데이터를 관리한다.(기본값)
          ...
        });
      },
      onSuccess: () => {
        if (toastId.current) {  // current type = undefined이므로 if문을 사용하여 값의 확실성을 갖어야 오류가 발생하지 않는다.
          toast.update(toastId.current, {
            ...
          });
        }
        queryClient.refetchQueries(["me"]);
      },
    });
    const onLogOut = async () => {
      mutation.mutate();
    };

# ! toastId type 오류

onSuccess()부분에 if문을 사용하지 않았을 때 toast.update(`toastId.current` 부분에서 에러발생

    >>>: Type 'undefined' is not assignable to type 'ToastId'.

    해당로직을 if() 안에 넣어주면 오류가 발생하지 않는다.

### 20.16 Code Challenge

이번 코드 챌린지는 sign up모달창을 구현하는 것이다.

1. sign up api생성 [V]
2. useForm을 사용하여 입력기능 구현. (register, handleSubmit, formState/error, reset)
   - 데이터 유효성 검사 추가
3. toast를 사용하여 성공여부 알려주기. [V]
   - useForm을 사용하여 예전 방식으로 기능 구현해보기. [V]
4. mutation을 사용하여 데이터 전달 state관리 기능 구현.
   - useref를 사용하여 데이터 관리
   - ToastId type 사용하기

우선 mutation을 사용하지 않고 기능구현을 진행하였다. (Basic)

# ! POST전송하지만, Option 프로토콜로 전송 301 에러

user 생성 post프로토콜을 전송하는데 backend쪽에서는 OPTIONS 프로토콜이 들어오면서 301 상태를 반환한다.

    !! 데이터를 전송하는 backend url이 잘못되었었다.

    "users" -> "users/"

    back-end구조가 config url에서 각 app의 url로 이동이 된다. 이동되면서 "/"를 붙여주면서 path를 이동한다.("users/")
        (app에서 "/"를 붙여주는것보다 안정성이 높았던 것으로 기억한다.)
    이전 로직 "users"에서는 path를 제대로 찾지 못한것으로 보인다.

데이터를 제대로 전달하는지 확인도 하지않고 완료되었다면 커밋을 진행하였다.
mutate()를 호출할때 데이터를 넣어주면 된다.
api에서 return도 확인.

githun, kakao 로그인을 mutation으로 변경하는 작업 진행중.

# ! mutate 반환값이 없음.

이전 기능에서는 api를 호출하면서 async-await함수를 사용하면서 반환값을 기달리고 화면을 전환하는 기능을 구현할 수 있었다.
하지만 mutation.mutate는 반환값이 없다. 그래서 로그인 정보가 들어오기 전에 화면 전환이 이뤄지면서 user query refech기능도 사용이 안된다.

! mutation.mutateAsync를 사용하면 response값을 받은 다음 로직이 진행이 된다.!!

### 21.0 Protected Pages

유저가 방을 등록하는 페이지를 생성한다.
@routes/UploadRoom.tsx 생성, router.tsx에 childer path 추가.

헤더 아바타 아이콘 리스트에 접근할 수 있는 링크 버튼을 생성한다. 해당 버튼은 유저 권한이 is_host가 있을때만 뜬다.

@Components/Header

    <MenuList>
      {user?.is_host ? (
        <Link to={"/api/v2/rooms/upload"}>
          <MenuItem>Upload Room</MenuItem>
        </Link>
      ) : null}
      ...
    </MenuList>

보안을 사용하여 페이지를 열수있는 권한을 가진 유저만이 페이지에 접근하도록 한다.

1. 로그인된 유저만이 접근 가능한 컴포넌트를 생성한다. @components/ProtectedPage.tsx
2. 그리고 is_host 권한을 가진 유저만이 접근 가능한 컴포넌트를 생성한다.

useUser.ts 훅을 사용하여 유저 권한을 확인한다.

    export default function ProtectedPage({ children }: IProtectedPageProp) { // children: components안의 element
      const { userLoading, isLoggedIn } = useUser();  // header에서 데이터를 이미 불러왔기때문에 cashe에서 데이터를 가져온다.
      const navigate = useNavigate();
      useEffect(() => {
        if (!userLoading) {
          if (!isLoggedIn) {
            navigate("/");
          }
        }
      }, [userLoading, isLoggedIn, navigate]);  // useEffect listen list
      return <>{children}</>;
    }

로그인이 안된상태에서는 홈으로 이동된다.

is_host권한은 user.is_host에서 확인한다.

해당 컴포넌트를 UploadRoom route에 사용한다.
@routes/UploadRoom.tsx

    <ProtectedPage>
      <HostOnlyPage>
        <h1>upload roommmmmm</h1>;
      </HostOnlyPage>
    </ProtectedPage>

두 컴포넌트는 훅으로도 생성하여 사용이 가능하다. 훅으로 사용시 매개변수와 리턴값이 없이 사용하면 된다.

@routes/UploadRoom

    ...
    useHostOnlyPage();
    return (
      <ProtectedPage>
        <h1>...</h1>;
      </ProtectedPage>
    );

### 21.1 Upload Form

upload room 페이지를 구현한다. chakra로 구성하며 구성 component예시들을 볼 수 있다.

[Form Control]<https://chakra-ui.com/docs/components/form-control>

@routes/UploadRoom.tsx를 구현한다.

[추가항목]

- Name
- Country
- City
- Address
- Price
- Rooms
- Toilets
- Descriptions
- pet_friendly
- Kind

kind항목은 강의에서는 select를 사용하여 구현했지만 나는 radio기능을 사용하여 구현해봤다.

### 21.2 Dynamic Form

upload room화면에 category, amenity 목록을 가져와서 선택하여 저장하도록 구현하겠다.

백엔드에 query부분을 수정 작업을 진행한다...

백엔드 작업 후 해당 쿼리를 가져오는 api를 등록한 후 useQuery를 사용하여 데이터를 리스트에 넣어준다.

@src/routes/UploadRoom.tsx

    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
      IAmenity[]
    >(["amenities"], getAmenities);
    ...
      <FormControl>
        <FormLabel>Amenities</FormLabel>
        <Grid templateColumns={"1fr 1fr"} gap={5}>
          {amenities?.map((amenity) => (
            <Box key={amenity.pk}>
              <Checkbox>{amenity.name}</Checkbox>
              <FormHelperText>{amenity.description}</FormHelperText>
            </Box>
          ))}
        </Grid>
      </FormControl>

저장 버튼을 생성한다.

### 21.3 Register

userForm의 register를 이용하여 데이터를 보내는 기능을 구현하겠다.

@src/routes/UploadRooms.tsx
{...register }는 입력 및 선택창(Input, Textarea, Checkbox, Radio, Select)에 적용한다.
(Select의 option에 적용하지 않는다.)

@src/api.ts
uploadRoom post api도 생성해 준다.

UploadRooms에 useMutation을 사용하여 데이터 전송 상태관리 기능을 구현한다.
(onSuccess, isLoading, error)

# ! 강의에서는 오류가 발생했는데 내 테스트에서는 저장이 성공되었다.?

암튼 그렇다. 다음 강의에서 해당 오류를 수정하는 과정을 진행할 것이다.
지금으로써는 backend에 category serializer를 변경한것 외에는 강의와 차이가 없다. (room category만 따로 찾아온는 view를 추가했다.)

### 21.4 Bugfix

지난 강의에서 발생한 오류는 backend에서 Response로 데이터를 보낼때 context값을 보내지 않아 발생한 오류이다.
(backend에 [11.13 Reverse Serializer (reviews)]를 참조.)
해당 오류는 backend 테스트중 발생하여 미리 수정작업을 진행했었다.

# ! Pet friendly를 check안할시 submit이 안됨

에러도 발생하지 않으며 마치 필수값을 안넣은 듯이 작동됨.
...아직 오류를 수정하지 못함. nico의 코드와 같게 적용이 되어 있음.

    [추후에 오류 해결시 내용 추가]

방 생성시 해당 방detail페이지로 이동되도록 구현한다. 방이 생성될때 backend에서 생성된 방 데이터를 반환한다.
@src/api.ts>uploadRoom

    반환값에 response.data를 갖고 오도록 적용 [L.1825]

@src/routes/UploadRoom.tsx

    - useNavigate() [L.2009]
    - useMutation()에 매개변수 추가 및 타입 설정 [L.1915]

방 데이터에 사진이 없을 경우 에러가 발생하며 pageNotFound페이지로 이동이 된다.
사진이 없을 경우 null이 출력되도록 적용을 한다.

@src/routes/Home.tsx

    # ?는 데이터가 없을 경우 null을 반환한다.
    room.photos[0].file -> room.photos[0]?.file

@src/routes/RoomDetail.tsx

    {data?.photos && data.photos.length > 0 ? (
      <Image
        ...
      />
    ) : null}

backend에서 데이터를 생성할때 pk대신에 컬럼명을 id로 생성하기때문에 type명을 변경한다.

    pk -> id

### 21.5 Upload Form

사진을 업로드하기위한 버튼을 생성한다.
main페이지에서 방 사진이 없을경우 대체 색을 적용하며 is_owner의 방일 경우
방사진에 하트버튼대신에 카메라버튼을 보여줘서 방사진을 등록하는 페이지로 이동하도록한다.

- 메인페이지에서 방사진이 없을 경우 초록색 바탕이 보이도록 설정
  {imgUrl ? ...}
- 타입에 isOwner를 추가한다
- Owner일 경우 하트버튼 대신에 카메라버튼이 나오도록한다.
  {isOwner ? ...}
- 카메라버튼일 경우 방사진을 등록하는 페이지로 이동하도록 적용
  - 페이지 생성
  - router에 등록
  - 룸사진에 click event 생성

```javascript
const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
  event.preventDefault(); // 이전의 Link기능이 사용되지 않게 한다.(이 기능이 없을 경우 Link컴포넌트가 실행됨)
  navigate(`api/v2/rooms/${pk}/photos`);
};
```

upload photo페이지를 구현한다.
@src/routes/UploadPhotos.tsx

```javascript
    ...
    <Input
      {...register("file")}
      type={"file"}  // 입력 파일형식을 받는다.
      accept="image/*"  // image형식만 가능하다.
    />
    ...
```

일반적인 업로드형식을 따르면 이렇다

    유저(클라이언트) --> 서버 --> 스토레이지 서비스

이번에 사용할 서비스는 Cloudflare이다. (유료)
CloudFlare를 사용할 경우 작동하는 방식은 이렇다.

1. 유저가 파일을 업로드할 URL을 서버에 요청한다.
2. 서버는 CLudFlare에 업로드할 URL을 받는다.
3. 유저에게 URL을 건내주면 유저는 해당 URL에 파일을 업로드한다.

우리서버는 파일을 받지 않으며 URL만 건내주며 해당 URL string만 관리한다.

# ! 파일관리에 사용될 다른 방법은 없는가?

타 서비스를 사용하지 않고 데이터베이스에 직접저장하여 관리하는 방법은 어떻게 구현하면 될까?
니꼬는 파일관리에 다른방법이 없으므로 이 서비스를 신청하여 구현하도록 요청하였다. (니꼬는 DB에 대해서는 잘 모르는거 같다.)

**만약 다른 방법들이 있다면 어떤 방법들이 있을지 업데이트 요청**

### 21.6 One Time Upload

월 5달러를 결제하면 이미지 업로드 기능을 사용할 수 있다.
[내 아이디를 이용한 image설정 화면]<https://dash.cloudflare.com/a8932df01716d4d5e2fc3cb9ad442c7d/images>
해당 기능을 사용하는 것은 다음에 진행하도록 하겠다.

기존에 해오던 로직으로 파일 전송테스트 로직을 작성할 수 있다.

[backend]

- 토큰을 .env에 등록한다.
- 해당 토큰 및 요청사항을 post로 이용하여 cloudflare URL에 전송한다.
- 받은 값을 response로 돌려준다.

[frontend]

- api에 backend에 등록한 url로 post요청을 보낸다.
- 보낼때 file데이터를 useMutation훅으로 보내준다.
- 받은 값을 console.log로 찍는다.

### 21.7 File Upload

**cloudflare를 이용한 데이터 업로드 로직**
frontend

### 21.8 Final Mutation

**cloudflare를 이용한 데이터 업로드 로직**
frontend, backend

...

### 21.9 Recap

...
이미지가 찌그러져서 나온다면 Image컴포넌트 속성에
objectFit={"cover"} 를 사용하면 기존 이미지 비율을 유지해서 나온다.

### 22.0 Calendar Component

예약 날짜를 위한 캘린더 기능을 사용한다. 리액트 캘린더 프로그램을 사용하여 기능을 구현한다.

[react-calendar]<https://www.npmjs.com/package/react-calendar>

$ npm i react-calendar

사용을 위해 import를 한다. t.ds파일이 없다며 오류가 발생한다.
오류 메세지에 설치 명령어를 입력해준다.

$ npm i --save-dev @types/react-calendar

오류가 사라진다. d.ts파일이 설치하면 서버는 서버를 재실행해야 인식이 된다.

calendar에 css파일도 필요하기때문에 임시로 제공해주는 css파일을 import한다.

```javascript
import "react-calendar/dist/Calendar.css";
```

캘린더 공간을 위해 Grid를 사용하여 공간을 분리하였다.
좌측에는 기존에 작업한 owner정보와 리뷰가 있으며 오른쪽에 캘린더를 위치한다.

캘린더 컴포넌트를 사용하여 바로 기능을 사용이 가능하다. 속성을 넣어 일부 기능을 변경하겠다.

```javascript
<Calendar
  onChange={setDates}
  prev2Label={null} // 이전 년단위 이동 버튼을 삭제한다.
  next2Label={null} // 다음 ''
  minDetail="month" // 캘린더 선택에 년단위는 제외한다.
  minDate={new Date()} // 선택가능한 최소날짜 (오늘 날짜)
  maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)} // 최대날짜 (6개월)
  selectRange // 범위 선택(복수 선택)
/>
```

값관리는 useState를 사용한다. state에는 항상 타입을 지정해준다. <Date>를 사용하면 된다.
해당 데이터 변경을 console.log로 확인한다.
해당 데이터를 보내주면 서버에서는 예약이 가능한지 알려주는 기능을 구현하기로 한다.

### 22.1 Booking Dates

backend에서 예약가능한 날을 check하는 url을 생성한다...

...생성한 backend URL에 날짜데이터를 보내주는 로직을 구현한다.

[console]

```javascript
const d = new Date()
d.toJSON()
>>>: '2023-03-15T08:07:45.806Z'
d.toJSON().split("T")
>>>: ['2023-03-15', '08:07:45.806Z']
```

toJSON().split()를 이용하여 날짜값으로 가져와본다.

```javascript
...
const [dates, setDates] = useState<Date[]>();  // 배열타입으로 변경한다.
useEffect(() => {
  if (dates) {
    const [firstDate, secondDate] = dates;
    const [check_in] = firstDate.toJSON().split("T");  // 첫번째값만 가져온다.
    const [check_out] = secondDate.toJSON().split("T");
    console.log(check_in, check_out);
  }
}, [dates]);
...
```

### 22.2 Checking Dates

예약날짜를 선택시 예약가능 여부를 알려주는 로직을 작성한다.
useQuery훅을 사용하여 api호출을 작선한다.

@src/routes/RoomDetail.tsx

```javascript
const [dates, setDates] = useState<Date[]>();  // Calendar 컴포넌트 prop에서 변경. onChange={setDates}
const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
);
```

받아오는 dates값은

    Tue Mar 28 2023 17:56:44 GMT+0900 (한국 표준시)

이런 형식이다. dates.toJSON()는

    '2023-03-28T08:56:44.968Z'

으로 split으로 앞에 날짜값만 가져올수 있다.

    dates.toJSON().split("T")
    >>>: '2023-03-28'

위 방식을 사용하여 날짜값을 변수에 넣어준다. checkBooking api를 추가해준다.

@src/api.ts

```javascript
type checkBookingQueryKey = [string, string?, Date[]?];  // dates 타입을 지정해줘야 type오류가 발생하지 않는다.

export const checkBooking = ({
    queryKey,
}: QueryFunctionContext<checkBookingQueryKey>) => {
    const [_, roomPk, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;  // 이부분이 타입이 없다면 오류가 발생.
        const [checkIn] = firstDate.toJSON().split("T");
        const [checkOut] = secondDate.toJSON().split("T");
        return instance
        .get(
            `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
        )
        .then((response) => response.data);
    }
};
```

가능여부에 따라 backend에서 Boolean값을 반환한다.

가능여부에 따라 화면에서 예약버튼 클릭가능여부 및 불가능 안내문구를 추가해준다.

```javascript
<Button
  disabled={!checkBookingData?.ok} // false일 경우 클릭 불가능
  isLoading={isCheckingBooking}
  my={5}
  w={"91%"} // 캘릭더 크기에 맞춤
  colorScheme={"red"}
>
  Make booking
</Button>;
{
  !isCheckingBooking && !checkBookingData?.ok ? ( // false일 경우
    <Text color={"red.500"}>Can't book on those dates, sorry.</Text>
  ) : null;
}
```

### 22.3 Timezones

캘린더에 날짜데이터를 가져올때 json형식으로 데이터를 가져올때 데이터의 변형이 이뤄진다.

    받아오는 dates값은
        >>>: Tue Mar 28 2023 17:56:44 GMT+0900 (한국 표준시)

    이런 형식이다. dates.toJSON()는
        >>>: '2023-03-28T08:56:44.968Z'

이미 예약되어있는 데이터를 가져올 때 DB에서는 한국 표준시로 가져오지만 예약날짜를 체크할때는 한국 표준시로 가져오지 않으면서 버그가 발생한다.
예를 들어 10일까지 예약이 되어 있고 11일에 예약을 할려고 하면 예약이 이미 있다고 체크가 된다.
그러므로 toJSON()으로 가져오는 방식을 변경하기로 한다.

```javascript
`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
```

일일히 가져와서 데이터형식에 맞춰 넣어준다. getMonth()는 1월이 0부터 시작하므로 +1을 해준다.
해당 형식을 utils파일을 생성하여 옮겨준다.

@src/lib/utils.ts

```javascript
export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
```

@.../api.ts 에서 해당 함수에 데이터를 보내줘서 값을 받는다.

캘린더의 css를 수정하여 적용하기로 한다. css파일을 생성한다. 강의 링크에서 파일을 가져와서 적용했다.
@src/calendar.css 생성 후 RoomDetail.tsx에 import.

웹페이지가 변경될때 title을 변경하고자 한다면 react-Helmet을 사용하여 기능구현을 한다.

    $ npm i react-Helmet
    $ npm i --save-dev @types/react-helmet

구현할 페이지에 아무곳에 helmet컴포넌트를 넣어서 사용하면 된다.

```javascript
<Helmet>
  <title>{data ? data.name : `Loading...`}</title>
</Helmet>
```

이전 booking버튼에 날짜를 선택하지 않았는데 loading표시가 생기는 현상을 수정한다. 날짜 데이터가 들어왔을때 loading기능이 실행되도록 적용한다.

@.../RoomDetail.tsx

```javascript
<Button
    isLoading={... && dates !== undefined}
>
```

Calendar에서 showDoubleView 속성을 사용하게 될경우 next month의 날짜를 선택하면 현재달로 인식하면서 선택한 달이 왼쪽으로 이동하는 현상이 있었다.
그 현상을 억제하는 props가 있다.

```javascript
<Calendar
    goToRangeStartOnSelect
>
```

테스트 필요.. 아직 미확인
