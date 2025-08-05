CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================
-- Users
-- =================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nickname TEXT
);

-- =================================================================
-- Quiz Base
-- =================================================================

CREATE TABLE quiz_types (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
);

CREATE TABLE quiz (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    quiz_type_id INT NOT NULL REFERENCES quiz_types(id) ON DELETE RESTRICT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    question TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE quiz_tags (
    quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE RESTRICT,
    PRIMARY KEY (quiz_id, tag_id)
);

-- =================================================================
-- Choice Quiz
-- =================================================================

CREATE TABLE choice_quiz (
    quiz_id UUID PRIMARY KEY REFERENCES quiz(id) ON DELETE CASCADE,
    is_multiple_choice BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE choice_quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES choice_quiz(quiz_id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    option_order INT NOT NULL DEFAULT 0
);

CREATE TABLE choice_quiz_answers (
    quiz_id UUID NOT NULL REFERENCES choice_quiz(quiz_id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES choice_quiz_options(id) ON DELETE CASCADE,
    PRIMARY KEY (quiz_id, option_id)
);

-- =================================================================
-- Short Answer Quiz
-- =================================================================

CREATE TABLE short_answer_quiz (
    quiz_id UUID PRIMARY KEY REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE short_answer_quiz_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES short_answer_quiz(quiz_id) ON DELETE CASCADE,
    answer TEXT NOT NULL
);

-- =================================================================
-- Long Answer Quiz
-- =================================================================

CREATE TABLE long_answer_quiz (
    quiz_id UUID PRIMARY KEY REFERENCES quiz(id) ON DELETE CASCADE,
    answer TEXT NOT NULL,
    grading_criteria TEXT
);

-- =================================================================
-- OX Quiz
-- =================================================================

CREATE TABLE ox_quiz (
    quiz_id UUID PRIMARY KEY REFERENCES quiz(id) ON DELETE CASCADE,
    answer BOOLEAN NOT NULL
);

-- =================================================================
-- Ordering Quiz
-- =================================================================

CREATE TABLE ordering_quiz (
    quiz_id UUID PRIMARY KEY REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE ordering_quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES ordering_quiz(quiz_id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    option_order INT NOT NULL,
    answer_order INT NOT NULL
);

-- =================================================================
-- Quiz Sets
-- =================================================================

CREATE TABLE quiz_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_set_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_set_id UUID NOT NULL REFERENCES quiz_sets(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    item_order INT NOT NULL
);

CREATE TABLE user_saved_quiz_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_set_id UUID NOT NULL REFERENCES quiz_sets(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =================================================================
-- Quiz Queue
-- =================================================================

CREATE TABLE quiz_queue_items (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    last_solved_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, quiz_id)
);

-- =================================================================
-- Indexes
-- =================================================================

CREATE INDEX idx_quiz_creator_id ON quiz(creator_id);
CREATE INDEX idx_quiz_quiz_type_id ON quiz(quiz_type_id);
CREATE INDEX idx_quiz_is_public ON quiz(is_public);
CREATE INDEX idx_quiz_created_at ON quiz(created_at);

CREATE INDEX idx_choice_quiz_options_quiz_id ON choice_quiz_options(quiz_id);

CREATE INDEX idx_quiz_set_items_quiz_set_id ON quiz_set_items(quiz_set_id);
CREATE INDEX idx_quiz_set_items_quiz_id ON quiz_set_items(quiz_id);

CREATE INDEX idx_user_saved_quiz_sets_user_id ON user_saved_quiz_sets(user_id);
CREATE INDEX idx_user_saved_quiz_sets_quiz_set_id ON user_saved_quiz_sets(quiz_set_id);

-- =================================================================
-- Triggers
-- =================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quiz_updated_at BEFORE UPDATE ON quiz
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_sets_updated_at BEFORE UPDATE ON quiz_sets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
