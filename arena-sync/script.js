async function loadArenaChannel(channelSlug, targetId) {
  const target = document.getElementById(targetId);

  try {
    const response = await fetch(`https://api.are.na/v2/channels/${channelSlug}/contents?per=100`);
    const data = await response.json();

    // 이미지 블록만 골라내기
    const imageBlocks = (data.contents || []).filter(block => block.class === "Image");

    target.innerHTML = "";

    imageBlocks.forEach(block => {
      const imgUrl = block.image?.display?.url || block.image?.original?.url;
      if (!imgUrl) return;

      const link = document.createElement("a");
      link.href = block.source?.url || imgUrl;
      link.target = "_blank";

      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = block.title || "Are.na image";

      link.appendChild(img);
      target.appendChild(link);
    });
  } catch (error) {
    console.error(`Failed to load channel ${channelSlug}:`, error);
    target.innerHTML = "<p>이미지를 불러오지 못했습니다.</p>";
  }
}

// 여기 slug만 각각 다르게 넣기
loadArenaChannel("birdcall-year-book-2025", "arena-01");
loadArenaChannel("", "arena-02");
loadArenaChannel("", "arena-03");



















