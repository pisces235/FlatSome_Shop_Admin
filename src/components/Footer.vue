<template>
    <div class="container">
        <div class="block">
            <div class="title">ABOUT US</div>
            <hr width="25px" />
            <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
            </p>
            <div class="contain-about">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="far fa-envelope"></i>
                <i class="fab fa-pinterest-p"></i>
            </div>
        </div>
        <div class="block">
            <div class="title">LATEST NEWS</div>
            <hr width="25px" />
            <div class="contain-news">
                <div class="news">
                    <span class="date">19 Now</span>
                    <div class="news-title">Welcome to Flatsome</div>
                </div>

                <div class="news">
                    <span class="date">13 Oct</span>
                    <div class="news-title">
                        Just another post with a gallery
                    </div>
                </div>

                <div class="news">
                    <span class="date">13 Oct</span>
                    <div class="news-title">A simple blog post</div>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="title">TAGS</div>
            <hr width="25px" />
            <div class="contain-link">
                <router-link to="/">bag</router-link>
                <router-link to="/">content</router-link>
                <router-link to="/">Converse</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
                <router-link to="/">bag</router-link>
            </div>
        </div>
        <div class="block">
            <div class="title">SIGNUP FOR NEWSLETTER</div>
            <hr width="25px" />
            <p>
                Signup to get news about Flatsome & WooCommerce. We don't spam!
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    color: white;
    width: 73%;
    margin: 0 13.5%;
    .block {
        display: block;
        width: 22%;
        margin-right: 3%;
        float: left;

        .title {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #f1f1f1;
        }

        .contain-about {
            i {
                width: 30px;
                height: 30px;
                padding: 6px 0 0 0;
                border: 2px solid white;
                border-radius: 50%;
                margin-right: 6px;
            }
            i:nth-child(1):hover {
                background-color: #3b5998;
            }
            i:nth-child(1) {
                padding-left: 7px;
            }
            i:nth-child(2):hover {
                background-color: #e1306c;
            }
            i:nth-child(2) {
                padding-left: 6px;
            }
            i:nth-child(3):hover {
                background-color: #55acee;
            }
            i:nth-child(3) {
                padding-left: 6px;
            }
            i:nth-child(4):hover {
                background-color: #88001b;
            }
            i:nth-child(4) {
                padding-left: 5px;
            }
            i:nth-child(5):hover {
                background-color: red;
            }
            i:nth-child(5) {
                padding-left: 6.5px;
            }
        }

        .contain-news {
            .news {
                width: 100%;
                float: left;
                margin-bottom: 10px;
                border-bottom: 2px solid #828282;
                padding-bottom: 10px;
                .date {
                    border: 2px solid white;
                    margin-top: 7px;
                    padding-top: 3px;
                    display: block;
                    width: 35px;
                    height: 35px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #f1f1f1;
                    line-height: 12px;
                    text-align: center;
                    float: left;
                }
                .news-title {
                    float: left;
                    margin-left: 10px;
                    word-wrap: break-word;
                    width: calc(100% - 50px);
                }
            }
        }
        .contain-link {
            a {
                display: block;
                padding: 3px;
                border: 1px solid white;
                border-radius: 5px;
                width: fit-content;
                color: #f1f1f1;
                float: left;
                margin-right: 5px;
                margin-bottom: 5px;
                font-size: 13px;
            }
        }
    }
    .block:nth-child(4) {
        margin-right: 0;
    }
}
@media (max-width: 1024px) {
    .container {
        .block {
            width: 100%;
            margin: 15px 0 15px 0;
        }
    }
}
</style>
