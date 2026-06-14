import PhoneMockup from "./PhoneMockup";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">Sản Phẩm / Portfolio</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-sub">Sản phẩm nổi bật tôi đã xây dựng.</p>
        </header>

        <div className="project-card reveal">
          <div className="project-info">
            <div className="proj-chips">
              <span className="chip chip-ac">Mobile App</span>
              <span className="chip">Flutter</span>
              <span className="chip">Firebase</span>
              <span className="chip">Education</span>
            </div>
            <h3 className="proj-title">NihonGo</h3>
            <p className="proj-subtitle">Ứng dụng học tiếng Nhật cho người mới bắt đầu</p>
            <p className="proj-desc">
              Ứng dụng di động giúp người mới bắt đầu học tiếng Nhật hiệu quả. Sử
              dụng hệ thống flashcard thông minh và thuật toán lặp lại theo khoảng
              cách (spaced repetition) để tối ưu việc ghi nhớ ký tự và từ vựng.
            </p>
            <ul className="proj-features">
              <li>Học Hiragana, Katakana và từ vựng cơ bản</li>
              <li>Thuật toán spaced repetition thông minh</li>
              <li>Theo dõi tiến độ và streak hàng ngày</li>
              <li>Hoạt động offline, không cần internet</li>
            </ul>
            <div className="proj-btns">
              <a href="#" className="btn-primary">
                Xem chi tiết
              </a>
              <a href="#" className="btn-ghost">
                GitHub
              </a>
            </div>
          </div>
          <div className="project-visual">
            <div className="pv-glow" />
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
