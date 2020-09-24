<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Plateforme
 *
 * @ORM\Table(name="plateforme")
 * @ORM\Entity
 */
class Plateforme
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_plateforme", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idPlateforme;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=30, nullable=false)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="redirection", type="string", length=254, nullable=false)
     */
    private $redirection;

    /**
     * @var string
     *
     * @ORM\Column(name="logo", type="string", length=254, nullable=false)
     */
    private $logo;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Video", mappedBy="idPlateforme")
     */
    private $idVideo;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idVideo = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getIdPlateforme(): ?int
    {
        return $this->idPlateforme;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getRedirection(): ?string
    {
        return $this->redirection;
    }

    public function setRedirection(string $redirection): self
    {
        $this->redirection = $redirection;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): self
    {
        $this->logo = $logo;

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
            $idVideo->addIdPlateforme($this);
        }

        return $this;
    }

    public function removeIdVideo(Video $idVideo): self
    {
        if ($this->idVideo->contains($idVideo)) {
            $this->idVideo->removeElement($idVideo);
            $idVideo->removeIdPlateforme($this);
        }

        return $this;
    }

}
