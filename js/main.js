var chars = [
  'Alchemist',
  'Archer',
  'Barbarian',
  'Battle Mage',
  'Cleric',
  'Cyborg',
  'Druid',
  'Human',
  'Neon Knight',
  'Ninja',
  'Paladin',
  'Pixie',
  'Scientist',
  'Sorcerer',
  'Thief',
  'Troll',
  'Wizard',
]

var app = new Vue({
  el: '#app',
  data: {

    classes: chars,
    hues: [0, 45, 90, 135, 180, 225, 270, 315],
    hueI: 0,

    tickTime: 0.1,
    timelines: {},

    scene: {
      forestBgPos: 0,
      trees: []
    },

    player: {
      name: '',
      class: '',
      hue: 0,

      x:800,
      y:0,
      sx:0,
      sy:0
    },

    mcf: {
      x: 800,
      y:0,
      sx:0,
      sy:0
    },

    villager: {
      x: 800,
      y:200,
      sx:0,
      sy:0
    },

    swordVisible: false,
    blockChainBG: false,
    blockChainShowing: false,

    charInt: 25,

    txtBoxTitle: '',
    txtBoxMsg: '',
    txtBoxNext: undefined,
    txtBoxDone: false,
    txtBoxShow: false,
    txtFloatRight: false
  },
  mounted() {

  },
  methods: {

    showTxt(title, msg, next) {
      this.txtBoxShow = true
      this.txtBoxDone = false

      this.txtBoxTitle = title
      if (this.txtBoxTitle == 'Mysterious Figure') {
        this.txtFloatRight = true
      }
      else {
        this.txtFloatRight = false
      }

      msg += '\n\n'

      var msgCounter = 1

      var txtI = setInterval(()=>{
        msgCounter++
        this.txtBoxMsg = msg.substr(0,msgCounter)
        if (msg == this.txtBoxMsg) {
          clearInterval(txtI)
          this.txtBoxDone = true
        }

        this.txtBoxMsg = this.txtBoxMsg.replace(/~1/g, '<span style="color: cyan">')
        this.txtBoxMsg = this.txtBoxMsg.replace(/~2/g, '<span style="color: magenta">')
        this.txtBoxMsg = this.txtBoxMsg.replace(/~\//g, '</span>')
        this.txtBoxMsg = this.txtBoxMsg.replace(/~~/g, '<br>')
        this.txtBoxMsg = this.txtBoxMsg.replace(/~/g, '')

      }, this.charInt)
      var self = this
      this.txtBoxNext = () => {
        self.txtBoxShow = false
        next()
      }
    },

    firstScene() {

      this.$refs.charSelectScreen.classList.add('closed');

      let grassTL = gsap.timeline({
        repeat: -1,
      })
      grassTL.to(this.scene, {
        forestBgPos: -128,
        duration: this.tickTime * 20,
        ease: 'none'
      })

      this.player.x = 200
      this.player.y = 300 - 32
      let playerTL = gsap.timeline({
        repeat: -1,
        yoyo: true
      })
      playerTL.to(this.player, {
        sy: -6,
        duration: this.tickTime * 2.5,
        ease: 'none'
      }, 0)

      // TREES

      for (var i = 0; i < 30; i++) {
        this.scene.trees.push({
          y: Math.floor(Math.random() * 600),
          x: Math.floor(Math.random() * 1600) //+ 800
        })
      }
      let treesTL = gsap.timeline({
        repeat: -1,
        onRepeat: ()=>{
          for (var i = 0; i < this.scene.trees.length; i++) {
            if (this.scene.trees[i].x > -64) {
              this.scene.trees[i].x -= 1.5;
            }
            else {
              this.scene.trees[i].x += 1600
            }
          }
        },
      })
      treesTL.to(this.scene, {
        duration: this.tickTime / 10,
        ease: 'none'
      })

      this.showTxt(
        '',
        `After a long day of adventures,~~ ~1${this.player.name}, the ${this.player.class}~/ heads back to the village to rest and sell loot.`, ()=>{
        this.secondScene()
      })

      this.timelines.grassTL = grassTL
      this.timelines.treesTL = treesTL
      this.timelines.playerTL = playerTL
    },

    secondScene() {
      var self = this
      this.timelines.grassTL.pause()
      this.timelines.treesTL.pause()
      this.timelines.playerTL.pause()

      this.mcf.x = 800
      this.mcf.y = 300 - 32

      var mcfjogTL = gsap.timeline({
        repeat: -1,
        yoyo: true
      })
      mcfjogTL.to(this.mcf, {
        sy: -6,
        duration: this.tickTime * 2.5,
        ease: 'none'
      }, 0)

      this.showTxt(
        'Mysterious Figure',
        `Psst... ~~ ~~ Hey kid...`, ()=>{
          self.txtBoxDone  = false
          let mcfTL = gsap.timeline({
            onComplete() {
              mcfjogTL.pause()
              self.swordVisible = true;
              self.txtBoxDone  = false

              self.showTxt(
                'Mysterious Figure',
                `Wanna buy a magic sword?`, ()=>{

                self.showTxt(
                  self.player.name,
                  `What's so magic about it?`, ()=>{
                    self.showTxt(
                      'Mysterious Figure',
                      `It's an ~2NFT SWORD~/! ~~ ~~ Unlike any other possession in this game,
                      an item that is tied to NFT, or a ~2Non-Fungible Token~/ grants its owner...~~
                      TRUE OWNERSHIP`, ()=>{

                      self.showTxt(
                        self.player.name,
                        `??? ~~ ~~So how is my current ownership different than TRUE OWNERSHIP?`, ()=>{
                          self.showTxt(
                            'Mysterious Figure',
                            `Foolish ~1${self.player.name}~/, do you think you truly own all those items you carry?`, ()=>{

                            self.showTxt(
                              self.player.name,
                              `Well, yeah! I bought them with MY OWN real money!`, ()=>{
                                let villagerTL = gsap.timeline({
                                  onComplete() {
                                    self.showTxt(
                                      'Random Villager',
                                      `Watch out everyone!~~ The GAME COMPANY went bankrupt and they're deleting THE WHOLE WORLD! AAAHH!`, ()=>{
                                      self.thirdScene()
                                    })
                                  }
                                })
                                villagerTL.to(self.villager, {
                                  x: 400 - 32,
                                  duration: self.tickTime * 10,
                                  ease: 'none'
                                }, 0)
                            })
                          })
                      })
                    })
                })
              })
            }
          })
          mcfTL.to(self.mcf, {
            x: 600,
            duration: self.tickTime * 10,
            ease: 'none'
          }, 0)

      })
    },
    thirdScene() {
      var self = this
      self.blockChainBG = true

      setTimeout(()=>{
        self.showTxt(
          'Mysterious Figure',
          `It's okay kid, ~~ you can open your eyes now...`, ()=>{

          self.blockChainShowing = true

          self.showTxt(
            self.player.name,
            `Whoa! What is this place? ~~ WAIT! WHERE IS ALL MY STUFF?`, ()=>{

              self.showTxt(
                'Mysterious Figure',
                `We are in a dimension, called the BLOCKCHAIN. ~~ This is where those ~2NFTs~/ I was talking about come from`, ()=>{

                self.showTxt(
                  self.player.name,
                  `That's great, but, ~~ ~~ WHERE IS ALL MY STUFF?`, ()=>{

                  self.showTxt(
                    'Mysterious Figure',
                    `Well yeah, that's what i've been trying to tell you.
                    You did not ever TRULY OWN those items!`, ()=>{

                      self.showTxt(
                        self.player.name,
                        `How come YOUR sword didn't go *POOF*?`, ()=>{

                        self.showTxt(
                          'Mysterious Figure',
                          `Because it's an ~2NFT~/! ~~ a NON-FUNGIBLE TOKEN, that means it is native to this dimension.
                          One-of-a-kind items like artwork, a virtual pet, or this sword are examples of things that can be ~2non-fungible tokens~/.`, ()=>{
                            self.showTxt(
                              self.player.name,
                              `But how was it IN the game?`, ()=>{

                              self.showTxt(
                                'Mysterious Figure',
                                `The GAME DEVELOPERS of that game allowed the use of ~2NON-FUNGIBLE TOKENS~/ in it, that means that some assets you can use inside the game are actually tied to this BLOCKCHAIN.`, ()=>{

                                  self.showTxt(
                                    self.player.name,
                                    `Oh good for you, but I lost everything!!`, ()=>{

                                    self.showTxt(
                                      'Mysterious Figure',
                                      `Since you have nothing now, you can take that sword for free! ;)`, ()=>{
                                        self.swordVisible = false;

                                        self.showTxt(
                                          '',
                                          `~1${self.player.name}~/ received ~2NFT SWORD~/!`, ()=>{

                                            self.showTxt(
                                              self.player.name,
                                              `Thanks, but... ~~
                                              What am I gonna do with a sword in this dimension?`, ()=>{

                                              self.showTxt(
                                                'Mysterious Figure',
                                                `Oh, you can sell it on a marketplace for cash or use it in another game built on top of the BLOCKCHAIN. ~~
                                                ~~
                                                Come with me, noble ~1${self.player.name}, the ${self.player.class}~/ I'll show you!`, ()=>{

                                                let mcfOut = gsap.timeline({
                                                  repeat: 0,
                                                  onComplete() {
                                                    let playerOut = gsap.timeline({
                                                      repeat: 0,
                                                      onComplete() {
                                                        self.fin()
                                                      }
                                                    })
                                                    playerOut.to(self.player, {
                                                      y: -200,
                                                      duration: self.tickTime * 20,
                                                      ease: 'none'
                                                    })
                                                  }
                                                })
                                                mcfOut.to(self.mcf, {
                                                  y: -200,
                                                  duration: self.tickTime * 20,
                                                  ease: 'none'
                                                })

                                              })
                                            })
                                        })
                                    })
                                  })

                              })
                            })
                        })
                      })

                    // self.showTxt(
                    //   'Mysterious Figure',
                    //   `Some tokens are FUNGIBLE, that means they have no difference between each other.
                    //   coins are examples of fungible tokens, each coin has the same value as any other coin.`, ()=>{
                    //     self.showTxt(
                    //       'Mysterious Figure',
                    //       `Some tokens, however, are NON-FUNGIBLE, that means each of them are unique, even among themselves.
                    //       one-of-a-kind items like artwork, a virtual pet, or this sword are examples of non-fungible tokens.`, ()=>{
                    //
                    //
                    //
                    //
                    //     })
                    //
                    // })
                  })
                })
              })
          })
        })
      }, 1500)
    },
    fin() {
      var self = this

      self.$refs.finDialog.showModal()
      self.fin = true

    }
  }
})