# Hướng Dẫn Mirror Nhánh `danh` Từ GitLab Sang GitHub `main`

Mục tiêu:

```text
GitLab branch danh -> GitHub branch main
```

Mỗi lần push code lên nhánh `danh` ở GitLab, GitLab CI sẽ tự đẩy commit mới nhất sang nhánh `main` của repo GitHub.

## 1. Trạng thái hiện tại

Repo chính hiện đang nằm ở GitLab:

```text
https://gitlab.com/vnp-ai-first/manager-kols-models.git
```

Github account muốn mirror sang:

```text
https://github.com/DanhBNg
```

File `.gitlab-ci.yml` đã được thêm job:

```text
mirror_danh_to_github_main
```

Job này chỉ chạy khi branch GitLab là:

```text
danh
```

Job mirror cần clone đủ lịch sử Git, nên đã cấu hình:

```text
GIT_DEPTH=0
```

Nếu không có cấu hình này, pipeline có thể lỗi thiếu object khi push sang GitHub.

## 2. Việc cần làm trên GitHub

Tạo một repo mới trên GitHub, ví dụ:

```text
https://github.com/DanhBNg/manager-kols-models.git
```

Nên tạo repo rỗng, không thêm README, `.gitignore` hoặc license để tránh xung đột lịch sử commit.

## 3. Tạo GitHub token

Vào GitHub:

```text
Settings -> Developer settings -> Personal access tokens
```

Tạo token có quyền ghi repo.

Nếu dùng Fine-grained token, cấp quyền cho repo cần mirror:

```text
Contents: Read and write
Metadata: Read-only
```

Nếu repo là private, token cũng phải có quyền truy cập private repo đó.

## 4. Thêm biến vào GitLab

Vào GitLab project:

```text
Settings -> CI/CD -> Variables
```

Thêm 2 biến:

```text
GITHUB_TOKEN=token_github_cua_ban
GITHUB_MIRROR_REPO=DanhBNg/manager-kols-models
```

Nên bật:

```text
Masked
Protected: tắt nếu branch danh chưa phải protected branch
```

## 5. Cách hoạt động

Khi push lên GitLab nhánh `danh`, GitLab CI sẽ chạy:

```bash
git push --force github HEAD:refs/heads/main
```

Nghĩa là GitHub `main` sẽ luôn giống nội dung mới nhất của GitLab `danh`.

## 6. Lưu ý quan trọng

- Không sửa trực tiếp code trên GitHub `main`, vì lần mirror tiếp theo từ GitLab sẽ ghi đè.
- GitLab vẫn là nơi làm việc chính.
- GitHub chỉ dùng để deploy hoặc chia sẻ cho nền tảng deploy như Railway/Vercel.
- Nếu đổi tên repo GitHub, chỉ cần sửa biến `GITHUB_MIRROR_REPO` trong GitLab Variables.

## 7. Kiểm tra

Sau khi cấu hình xong:

```bash
git push origin danh
```

Vào GitLab `CI/CD -> Pipelines`, kiểm tra job:

```text
mirror_danh_to_github_main
```

Nếu job xanh, vào GitHub kiểm tra branch `main` đã có code mới.
