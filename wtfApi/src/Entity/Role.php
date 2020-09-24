<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Role
 *
 * @ORM\Table(name="role")
 * @ORM\Entity
 */
class Role
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_role", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idRole;

    /**
     * @var string
     *
     * @ORM\Column(name="libelle_role", type="string", length=30, nullable=false)
     */
    private $libelleRole;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Personne", mappedBy="idRole")
     */
    private $idPersonne;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idPersonne = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getIdRole(): ?int
    {
        return $this->idRole;
    }

    public function getLibelleRole(): ?string
    {
        return $this->libelleRole;
    }

    public function setLibelleRole(string $libelleRole): self
    {
        $this->libelleRole = $libelleRole;

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
            $idPersonne->addIdRole($this);
        }

        return $this;
    }

    public function removeIdPersonne(Personne $idPersonne): self
    {
        if ($this->idPersonne->contains($idPersonne)) {
            $this->idPersonne->removeElement($idPersonne);
            $idPersonne->removeIdRole($this);
        }

        return $this;
    }

}
