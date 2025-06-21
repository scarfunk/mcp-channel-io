# 채널톡 MCP 도구 (mcp-channel-talk, mcp-channel-io)

## 개요

비공식 채널톡 MCP 도구입니다.

이 프로젝트는 [채널톡](https://api-doc.channel.io/) 의 OPEN API를 활용하여 Model Context Protocol(MCP)과 연동하는 도구입니다.
이를 통해 AI 어시스턴트가 채널톡의 채팅 정보에 접근하고 활용할 수 있습니다.

<a href="https://smithery.ai/server/@scarfunk/mcp-channel-io"><img src="https://smithery.ai/badge/@scarfunk/mcp-channel-io" alt="Smithery.ai Downloads" /></a>

## 설명

### 구현 기능

1. 채팅리스트 조회
2. 각 채팅 메세지 리스트 조회 (병렬 요청)

### 조회 조건

- 채팅 상태, 태그, 관리자이름, 우선순위(중요도)로 조회
- 문의자의 이름, 이메일, 회사명, 전화번호로 조회
- 채팅 메세지 리스트 조회 시, 최신 메세지 10개까지로만 조회

### 세부사항

- 채널톡 OPEN_API 중 일부만 제공
- 응답의 크기가 클때, ai 동작이 원활하지 않는경우가 많아, 중간 map 작업을 통해 응답의 크기를 줄입니다. 따라서 최종 응답중 필요한 정보만으로 핸들링 합니다.

## MCP 클라이언트에서 사용

MCP 클라이언트 (Claude Desktop 등)에서 사용할 때는 다음과 같이 설정합니다:

```json
{
  "mcpServers": {
    "channel-io": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@scarfunk/mcp-channel-io",
        "--key",
        "your-smithery-key...",
        "--profile",
        "your-profile-name..."
      ]
    }
  }
}
```

## 로컬 개발 설정

### 설치

```bash
# 패키지 설치
npm install

# 빌드
npm run build
```

```json
// 로컬서버로 .cursor/mcp.json 에 넣고 싶으면 아래 처럼 추가.
{
  "mcpServers": {
    "channel-io": {
      "command": "node",
      "args": [
        "/path/to/YOUR-PROJECT-DIR/build/index.js",
        "--access-key",
        "YOUR_ACCESS_KEY...",
        "--secret-key",
        "YOUR_SECRET_KEY..."
      ]
    }
  }
}
```

### 1. CLI 인자로 실행 (권장)

```bash
# 빌드 후 실행
npm run build
node build/index.js --access-key YOUR_ACCESS_KEY --secret-key YOUR_SECRET_KEY
```

### 2. 환경 변수로 개발

프로젝트 루트에 `.env` 파일을 생성하고 필요한 API 키를 설정합니다:

```env
CHANNEL_TALK_X_ACCESS_KEY=your_access_key_here
CHANNEL_TALK_X_ACCESS_SECRET=your_access_secret_here
```

그후 실행

```bash
npm start
```

또는

```bash
node build/index.js
```

## 환경

### 필수 조건

- Node.js 18 이상
- npm 또는 yarn

### 기술 스택

- TypeScript
- Model Context Protocol SDK (@modelcontextprotocol/sdk)
- Zod (유효성 검증)
- dotenv (환경 변수 관리)

### API 키 얻기

1. [채널톡 개발자 콘솔](https://developers.channel.io/)에 로그인
2. 앱을 생성하고 API 키를 발급받으세요
3. Access Key와 Secret Key를 안전하게 보관하세요

## 보안 주의사항

- API 키를 코드에 하드코딩하지 마세요
- `.env` 파일을 git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- 프로덕션 환경에서는 CLI 인자나 환경변수를 사용하세요

## 참고 문서

- [채널톡 OPEN API 문서](https://api-doc.channel.io/)
- [채널톡 OPEN API 가이드 채팅 리스트](https://developers.channel.io/docs/list-of-userchats-1)
- [채널톡 OPEN API 가이드 채팅 메세지리스트](https://developers.channel.io/docs/get-a-userchats-messages-1)

- [MCP 가이드](https://modelcontextprotocol.io/introduction)
- [MCP 가이드 tools](https://modelcontextprotocol.io/docs/concepts/tools)

## 라이선스

ISC

## 기여

이슈와 풀 리퀘스트는 언제나 환영합니다.
