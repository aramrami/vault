# WARNING: Do not EDIT or MERGE this file, it is generated by 'packagespec lock'.
FROM debian:buster-20200720
COPY . ./
RUN apt-get update -y && apt-get install --no-install-recommends -y -q \
                         curl \
                         zip \
                         build-essential \
                         gcc-multilib \
                         g++-multilib \
                         ca-certificates \
                         git mercurial bzr \
                         gnupg \
                         libltdl-dev \
                         libltdl7 \
						             bash \
                      && rm -rf /var/lib/apt/lists/*