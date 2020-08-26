const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }, 
    post_image: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    // post_file: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3
    // }
    post_comment_count: {
        type: Number
    },
    post_id: {
        type: Number,
        required: true
    },
    post_content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },   
    post_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;