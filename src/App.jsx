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
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
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

      {headline && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{productName}</h2>
          <img src="https://via.placeholder.com/400x200.png?text=LED+제품+이미지" alt="제품 이미지" style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }} />
          <h3 style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>특장점</h3>
          <ul style={{ paddingLeft: '1.2rem', listStyle: 'disc' }}>
            <li>합리적인 가격</li>
            <li>손쉬운 설치</li>
            <li>자체생산의 좋은 품질</li>
          </ul>
          <h3 style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>설치방법</h3>
          <p style={{ fontStyle: 'italic' }}>{headline}</p>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>※ 세부 설치 방법은 사용자가 직접 추가해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default LEDDetailPageGenerator;
