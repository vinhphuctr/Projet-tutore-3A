<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Categorie
 *
 * @ORM\Table(name="categorie")
 * @ORM\Entity(repositoryClass="App\Repository\CategorieRepository")
 */
class Categorie
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_categ", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idCateg;

    /**
     * @var string
     *
     * @ORM\Column(name="libelle", type="string", length=20, nullable=false)
     */
    private $libelle;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Video", mappedBy="idCateg")
     */
    private $idVideo;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idVideo = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getIdCateg(): ?int
    {
        return $this->idCateg;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    /**
     * @return Collection|Video[]
     */
    public function getIdVideo(): Collection
    {
        return $this->idVideo;
    }

    public function addIdVideo(Video $idVideo): self
    {
        if (!$this->idVideo->contains($idVideo)) {
            $this->idVideo[] = $idVideo;
            $idVideo->addIdCateg($this);
        }

        return $this;
    }

    public function removeIdVideo(Video $idVideo): self
    {
        if ($this->idVideo->contains($idVideo)) {
            $this->idVideo->removeElement($idVideo);
            $idVideo->removeIdCateg($this);
        }

        return $this;
    }

}
