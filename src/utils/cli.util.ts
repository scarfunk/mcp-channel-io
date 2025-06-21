// CLI 인자 파싱 함수
export function parseCliArgs() {
  const args = process.argv.slice(2);
  const options: { [key: string]: string } = {};

  // --help 체크
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🚀 채널톡 MCP 서버

사용법:
  node build/index.js [옵션]

옵션:
  --access-key <key>    채널톡 Access Key
  --secret-key <key>    채널톡 Secret Key
  --ssl-off             SSL 인증서 검증 비활성화 (개발용)
  --help, -h           이 도움말 표시

예시:
  node build/index.js --access-key YOUR_KEY --secret-key YOUR_SECRET

환경변수:
  CHANNEL_TALK_X_ACCESS_KEY     채널톡 Access Key
  CHANNEL_TALK_X_ACCESS_SECRET  채널톡 Secret Key

더 자세한 정보는 README.md를 참고하세요.
`);
    process.exit(0);
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.substring(2);
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        options[key] = value;
        i++; // 다음 인자는 스킵
      }
    }
  }

  return options;
}

// 설정 값 가져오기 (CLI 인자 우선, 환경변수 fallback)
export function getConfig() {
  const cliArgs = parseCliArgs();

  const ACCESS_KEY =
    cliArgs["access-key"] || process.env.CHANNEL_TALK_X_ACCESS_KEY;
  const SECRET_KEY =
    cliArgs["secret-key"] || process.env.CHANNEL_TALK_X_ACCESS_SECRET;

  if (!ACCESS_KEY || !SECRET_KEY) {
    console.error("❌ 오류: ACCESS_KEY 또는 SECRET_KEY가 설정되지 않았습니다.");
    console.error(
      "CLI 인자로 설정하거나 .env 파일에 다음 변수를 설정해주세요:"
    );
    console.error("  CLI: --access-key YOUR_KEY --secret-key YOUR_SECRET");
    console.error("  ENV: CHANNEL_TALK_X_ACCESS_KEY=YOUR_KEY");
    console.error("       CHANNEL_TALK_X_ACCESS_SECRET=YOUR_SECRET");
    process.exit(1);
  }

  return { ACCESS_KEY, SECRET_KEY };
}
