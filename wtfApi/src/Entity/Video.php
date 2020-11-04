<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Video
 *
 * @ORM\Table(name="video")
 * @ORM\Entity(repositoryClass="App\Repository\VideoRepository")
 */
class Video
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_video", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idVideo;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=254, nullable=false)
     */
    private $titre;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_sortie", type="date", nullable=false)
     */
    private $dateSortie;

    /**
     * @var string
     *
     * @ORM\Column(name="poster", type="string", length=254, nullable=false)
     */
    private $poster;

    /**
     * @var string|null
     *
     * @ORM\Column(name="plot", type="text", length=65535, nullable=true)
     */
    private $plot;

    /**
     * @var string|null
     *
     * @ORM\Column(name="trailer", type="string", length=254, nullable=true)
     */
    private $trailer;

    /**
     * @var string|null
     *
     * @ORM\Column(name="vo", type="string", length=50, nullable=true)
     */
    private $vo;

    /**
     * @var int|null
     * 
     * @ORM\Column(name="id_prod", type="integer", nullable=true)
     */
    // private $idProd;
    // @ORM\ManyToOne(targetEntity="App\Entity\Production", inversedBy="idProd")


    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Categorie", inversedBy="idVideo", fetch="EAGER")
     * @ORM\JoinTable(name="appartenir",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_categ", referencedColumnName="id_categ")
     *   }
     * )
     */
    private $idCateg;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Plateforme", inversedBy="idVideo")
     * @ORM\JoinTable(name="diffuser",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_plateforme", referencedColumnName="id_plateforme")
     *   }
     * )
     */
    private $idPlateforme;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Personne", mappedBy="idVideo", fetch="EAGER")
     */
    private $idPersonne;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Utilisateur", mappedBy="idVideo")
     */
    private $idUtilisateur;

    /**
     * @ORM\ManyToOne(targetEntity=Production::class, inversedBy="video", fetch="EAGER")
     */
    private $production;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idCateg = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idPlateforme = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idPersonne = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idUtilisateur = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idProd = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function serializeVideo(){

        // Production
        $productionArray = array();
        if(is_null($this->getProduction())) {
            $productionArray = null;
        } else {
            $productionArray = array(
            'id' => $this->getProduction()->getId(),
            'nom' => $this->getProduction()->getNom(),
            );
        }

        // Personnes
        $personnesArray = array();
        if(is_null($this->getIdPersonne())){
            $personnesArray = null;
        } else {
            foreach ($this->getIdPersonne() as $value) {
                $personnesArray[] = $value->serializePersonnes();
            }
        }
        
        // Plateformes
        $plateformesArray = array();
        if(is_null($this->getIdPlateforme())){
            $plateformesArray = null;
        } else {
            foreach ($this->getIdPlateforme() as $value) {
                $plateformesArray[] = $value->serializePlateformes();
            }
        }

        return array(
            'idVideo' => $this->getIdVideo(),
            'titre' => $this->getTitre(),
            'dateSortie' => $this->getDateSortie(),
            'poster' => $this->getPoster(),
            'plot' => $this->getPlot(),
            'trailer' => $this->getTrailer(),
            'vo' => $this->getVo(),
            'production' => $productionArray,
            'personnes' => $personnesArray,
            'plateformes' => $plateformesArray
        );
    }

    public function getProduction(): ?Production
    {
        return $this->production;
    }

    public function setProduction(?Production $production): self
    {
        $this->production = $production;

        return $this;
    }

    public function getIdVideo(): ?int
    {
        return $this->idVideo;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDateSortie(): ?\DateTimeInterface
    {
        return $this->dateSortie;
    }

    public function setDateSortie(\DateTimeInterface $dateSortie): self
    {
        $this->dateSortie = $dateSortie;

        return $this;
    }

    public function getPoster(): ?string
    {
        return $this->poster;
    }

    public function setPoster(string $poster): self
    {
        $this->poster = $poster;

        return $this;
    }

    public function getPlot(): ?string
    {
        return $this->plot;
    }

    public function setPlot(?string $plot): self
    {
        $this->plot = $plot;

        return $this;
    }

    public function getTrailer(): ?string
    {
        return $this->trailer;
    }

    public function setTrailer(?string $trailer): self
    {
        $this->trailer = $trailer;

        return $this;
    }

    public function getVo(): ?string
    {
        return $this->vo;
    }

    public function setVo(?string $vo): self
    {
        $this->vo = $vo;

        return $this;
    }

    /**
     * @return Collection|Categorie[]
     */
    public function getIdCateg(): Collection
    {
        return $this->idCateg;
    }

    public function addIdCateg(Categorie $idCateg): self
    {
        if (!$this->idCateg->contains($idCateg)) {
            $this->idCateg[] = $idCateg;
        }

        return $this;
    }

    public function removeIdCateg(Categorie $idCateg): self
    {
        if ($this->idCateg->contains($idCateg)) {
            $this->idCateg->removeElement($idCateg);
        }

        return $this;
    }

    /**
     * @return Collection|Plateforme[]
     */
    public function getIdPlateforme(): Collection
    {
        return $this->idPlateforme;
    }

    public function addIdPlateforme(Plateforme $idPlateforme): self
    {
        if (!$this->idPlateforme->contains($idPlateforme)) {
            $this->idPlateforme[] = $idPlateforme;
        }

        return $this;
    }

    public function removeIdPlateforme(Plateforme $idPlateforme): self
    {
        if ($this->idPlateforme->contains($idPlateforme)) {
            $this->idPlateforme->removeElement($idPlateforme);
        }

        return $this;
    }

    /**
     * @return Collection|Personne[]
     */
    public function getIdPersonne(): Collection
    {
        return $this->idPersonne;
    }

    public function addIdPersonne(Personne $idPersonne): self
    {
        if (!$this->idPersonne->contains($idPersonne)) {
            $this->idPersonne[] = $idPersonne;
            $idPersonne->addIdVideo($this);
        }

        return $this;
    }

    public function removeIdPersonne(Personne $idPersonne): self
    {
        if ($this->idPersonne->contains($idPersonne)) {
            $this->idPersonne->removeElement($idPersonne);
            $idPersonne->removeIdVideo($this);
        }

        return $this;
    }

    /**
     * @return Collection|Utilisateur[]
     */
    public function getIdUtilisateur(): Collection
    {
        return $this->idUtilisateur;
    }

    public function addIdUtilisateur(Utilisateur $idUtilisateur): self
    {
        if (!$this->idUtilisateur->contains($idUtilisateur)) {
            $this->idUtilisateur[] = $idUtilisateur;
            $idUtilisateur->addIdVideo($this);
        }

        return $this;
    }

    public function removeIdUtilisateur(Utilisateur $idUtilisateur): self
    {
        if ($this->idUtilisateur->contains($idUtilisateur)) {
            $this->idUtilisateur->removeElement($idUtilisateur);
            $idUtilisateur->removeIdVideo($this);
        }

        return $this;
    }

}
