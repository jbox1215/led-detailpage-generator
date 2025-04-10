import React, { useState } from "react";

const LEDDetailPageGenerator = () => {
  const [productName, setProductName] = useState("");
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHeadline = async () => {
    setLoading(true);
    setHeadline("");
    try {
      const prompt = `LED 조명 제품명: "${productName}"\n설치 방법에 대한 한 문장짜리 큰 카피(감성 + 실용 중심) 생성:`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // ← 여기 본인 키로 바꿔야 함!
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const message = data.choices?.[0]?.message?.content;
      setHeadline(message.trim());
    } catch (error) {
      console.error("Error generating headline:", error);
      setHeadline("⚠️ 오류가 발생했어요. 다시 시도해보세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>LED 조명 상세페이지 생성기</h1>
      <input
        placeholder="제품명을 입력하세요 (예: 무드 라이트 S300)"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', margin: '1rem 0', border: '1px solid #ccc', borderRadius: '8px' }}
      />
    <button
  onClick={generateHeadline}
  disabled={loading || !productName}
  style={{
    padding: '0.5rem 1rem',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px'
  }}
>
  {loading ? "생성 중..." : "설치방법 카피 생성하기"}
</button>
